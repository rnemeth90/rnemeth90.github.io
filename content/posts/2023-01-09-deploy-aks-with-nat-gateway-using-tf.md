---
title: 'Deploy Azure Kubernetes Service with NAT Gateway using Terraform'
author: Ryan
date: '2023-01-09'
layout: post
draft: true
favorite: true
categories:
    - SRE
    - Kubernetes
    - Networking
    - Azure
    - Terraform
tags:
    - SRE
    - Kubernetes
    - Devops
    - Terraform
    - NAT Gateway
    - Azure
    - Networking
---


- Azure NAT Gateway is a fully managed highly resilient NAT (Network Address Translation) service provided by Microsoft. After creating a NAT Gateway and then associating it with a subnet, all devices in that subnet will automatically route outbound traffic through the gateway. This is because NAT Gateway takes precedence over other outbound routing methods and replaces the default Internet destination of a subnet. However, the presence of custom UDRs for virtual appliances and ExpressRoute override NAT gateway for directing internet bound traffic (route to the 0.0.0.0/0 address prefix).

- We can assign a single NAT Gateway to multiple subnets within a single vNet. However, we cannot use a NAT Gateway across multiple vNets.
- We can assign up to 16 IP addresses to a single NAT Gateway for outbound connectivity.
- NAT Gateway supports both TCP and UDP for outbound connectivity.

- Benefits
  - Security - Like an Azure Load Balancer, NAT Gateway will hide any resources behind it from the public internet. Meaning your resources in Azure are not publically exposed.
  - Resiliency - NAT Gateway is a fully managed service. There is netiher a VM nor a gateway device. It is entirely a software component which makes it resilient (relative to hardware). NAT Gateway's can have multiple fault domains.
  - Scalability - NAT Gateway scales automatically according to traffic demands. We do not need to configure any scaling rules.
  - Performance - Each NAT Gateway can provide up to 50 Gbps of throughput. 64512 SNAT ports are available for outbound connections for every public IP address, resulting in 50000 concurrent connections per public IP address.
  - When a NAT Gateway is configured to use a Public IP Address prefix, it will scale outbound IP addresses automatically per traffic demands (up to the max IP addresses in the prefix)

- Limitations
  - A NAT gateway can’t span multiple virtual networks.
  - Multiple NAT gateways can’t be attached to a single subnet.
  - A NAT gateway can’t be deployed in a gateway subnet.
  - A NAT gateway resource can use up to 16 IP addresses
  - NAT gateway can’t be associated to an IPv6 public IP address or IPv6 public IP prefix.

Now that we have looked at what a NAT Gateway is and the benefits associated with it, let's look at provisioning a new AKS cluster with a NAT Gateway for outbound connectivity.

To follow along, you will need the following:
- Contributor Access to an Azure Subscription
- Terraform installed locally
- Azure CLI installed locally
- a text editor (vscode or Vim)

## Terraform Project Fundamentals

Let's get started. First, we'll create a directory to house our project:

~~~sh
# create a folder for the project and cd to it
mkdir terraform-aks-with-nat-gateway
cd ./terraform-aks-with-nat-gateway
~~~

~~~sh

~~~

~~~tf
# create settings.tf
cat << EOF > settings.tf
terraform {
 required_version = "~> 1.2.8"
 required_providers {
  azurerm = {
   source = "hashicorp/azurerm"
   version = "~> 3.21.0"
  }
 }
}

provider "azurerm" {
 features {}
}
EOF
~~~

~~~tf
# create main.tf
cat << EOF > main.tf
resource "azurerm_resource_group" "resource_group" {
 name   = "\${var.aks_cluster_name}-rg"
 location = var.location
}
EOF
~~~

~~~tf
# create variables.tf
cat << EOF > variables.tf
variable "location" {
 type    = string
 default   = "eastus"
 description = "The region where the resources will be created."
}

variable "aks_cluster_name" {
 type    = string
 description = "The name assigned to the cluster."
}

variable "vnet" {
 type = object({
  cird      = string
  sn_cluster_cird = string
 })
 default = {
  cird      = "10.1.0.0/16"
  sn_cluster_cird = "10.1.0.0/22"
 }
 description = "The VNET and subnet configuration."
}
EOF
~~~

## Specify the vNet infrastructure in Terraform

We’ll keep the vNet infrastructure also fairly simple for this example. Let’s define a vNet with a single subnet. We will assign both AKS and NAT Gateway to that particular subnet.
~~~tf
cat << EOF > vnet.tf
# vnet.tf
resource "azurerm_virtual_network" "vnet" {
  name        = "\${var.aks_cluster_name}-vnet"
  address_space    = [var.vnet.cird]
  resource_group_name = azurerm_resource_group.resource_group.name
  location      = var.location
}

resource "azurerm_subnet" "cluster" {
  name         = var.aks_cluster_name
  virtual_network_name = "\${var.aks_cluster_name}-vnet"
  resource_group_name = azurerm_resource_group.resource_group.name
  address_prefixes   = [var.vnet.sn_cluster_cird]
}
EOF
~~~

## Create a NAT Gateway with Terraform
Our NAT Gateway should scale from one (1) to eight (8) IP addresses for outbound connectivity. We can achieve this by using an IP address prefix (azurerm_public_ip_prefix) with a prefix_length of 29. In Terraform, we can associate the IP address prefix to the NAT Gateway using the azurerm_nat_gateway_public_ip_prefix_association. Alternatively, you can use azurerm_nat_gateway_public_ip_association when using public IP addresses instead of IP address prefixes.

~~~tf
cat << EOF > nat_gateway.tf

resource "azurerm_public_ip_prefix" "nat_prefix" {
  name                = "\${var.aks_cluster_name}-pip-prefix"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = var.location
  ip_version          = "IPv4"
  prefix_length       = 29
  sku                 = "Standard"
  zones               = ["1","2","3"]
}
resource "azurerm_nat_gateway" "gw_aks" {
  name                    = "\${var.aks_cluster_name}-nat-gw"
  resource_group_name     = azurerm_resource_group.resource_group.name
  location                = var.location
  sku_name                = "Standard"
  idle_timeout_in_minutes = 10
  zones               = ["1","2","3"]
}

resource "azurerm_nat_gateway_public_ip_prefix_association" "nat_ips" {
  nat_gateway_id      = azurerm_nat_gateway.gw_aks.id
  public_ip_prefix_id = azurerm_public_ip_prefix.nat_prefix.id

}

resource "azurerm_subnet_nat_gateway_association" "sn_cluster_nat_gw" {
  subnet_id      = azurerm_subnet.cluster.id
  nat_gateway_id = azurerm_nat_gateway.gw_aks.id
}

output "gateway_ips" {
  value = azurerm_public_ip_prefix.nat_prefix.ip_prefix
}
EOF
~~~

The output in the snippet ensures that Terraform will print the CIDR reserved for outbound connectivity upon provisioning or mutation of the infrastructure with Terraform.

## Create an AKS cluster with NAT Gateway in Terraform

Although we can provision full-fledged AKS clusters in Terraform, we will keep the AKS cluster as simple as possible. We can use the azurerm_kubernetes_service_versions data source to identify the most recent Kubernetes version available in the desired Azure Region. Look at the network_profile. We use outbound_type to specify that we’ll use our “user-assigned” NAT Gateway. This requires the load_balancer_sku to be set to Standard.

~~~tf
cat << EOF > aks.tf
data "azurerm_kubernetes_service_versions" "aks_version" {
  location        = azurerm_resource_group.resource_group.location
  include_preview = false
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "\${var.aks_cluster_name}"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = var.location
  node_resource_group = "\${var.aks_cluster_name}-np01"
  sku_tier            = "Free"
  kubernetes_version  = data.azurerm_kubernetes_service_versions.aks_version.latest_version

  dns_prefix = "gr-aks-01"

  default_node_pool {
    name                = "default"
    vm_size             = "Standard_D4s_v4"
    zones               = ["1", "2", "3"]
    enable_auto_scaling = true
    min_count           = 1
    max_count           = 3
    os_disk_type        = "Managed"
    os_disk_size_gb     = 32
    type                = "VirtualMachineScaleSets"
    vnet_subnet_id      = azurerm_subnet.cluster.id
  }

  network_profile {
    network_plugin     = "azure"
    network_policy     = "azure"
    dns_service_ip     = "172.16.0.10"
    docker_bridge_cidr = "172.18.0.1/16"
    service_cidr       = "172.16.0.0/16"
    load_balancer_sku  = "standard"
    outbound_type      = "userAssignedNATGateway"
    nat_gateway_profile {
      idle_timeout_in_minutes = 4
    }
  }

  identity {
    type = "SystemAssigned"
  }

  lifecycle {
    ignore_changes = [
      network_profile[0].nat_gateway_profile
    ]
  }
}
EOF
~~~

Also, recognize the lifecycle argument. We’ve to explicitly ignore changes being made to network_profile[0].nat_gateway_profile (for now). If we don’t ignore the nat_gateway_profile, Terraform will replace the entire AKS cluster every time we apply the project.

## Provisioning the infrastructure with Terraform
Now that we’ve specified all necessary resources in our Terraform project, we can finally move on and deploy the entire infrastructure using terraform apply.Terraform will present a detailed execution plan that outlines what will happen when you confirm the execution plan. Review the plan and confirm to start infrastructure provisioning.

Once provisioning has finished, you should see the IP addresses associated with the NAT Gateway:

`ateway_ips = "20.79.170.48/29"`

## Test outbound connectivity is routed through NAT Gateway

To test outbound connectivity, we can quickly run a small Ubuntu container in the Kubernetes cluster for verification. First, let’s download the necessary credentials to interact with the Kubernetes cluster:
~~~sh
# get credentials for Kubernetes
az aks get-credentials -n aks-with-nat-gateway \
 -g rg-aks-with-nat
# Merged "aks-with-nat-gateway" as current context in /Users/<YOUR_USER_ID>/.kube/config
~~~

Let’s now spin up the Ubuntu container to verify outbound connectivity:
~~~sh
kubectl run --rm -it ubuntu \
 -n default \
 --image ubuntu:latest /bin/bash

# Within a few seconds, you should see a Linux prompt
root@ubuntu:/# apt update && apt install curl --yes

# removed logs
# removed logs

root@ubuntu:/# curl http://ipv4.icanhazip.com
# 20.79.170.49

# exit from the container using [CTRL]+D
~~~

As you can see, we requested http://ipv4.icanhazip.com from the IP 20.79.170.49, which is obviously within the range of 20.79.170.48/29.

## Destroy the infrastructure
You can quickly destroy the entire infrastructure using terraform destroy -auto-approve.

## What we’ve covered in this article
Again, we covered a bunch of stuff in this article, including:

- 💡 Understand what NAT Gateway is
- 🙌🏼 Learn the benefits of using a NAT Gateway for outbound connectivity compared to other options
- 👷 Provisioned AKS and NAT Gateway using Terraform
- 🔒 Authenticated with an Kubernetes cluster in Azure
- 🏃🏻‍♂️ Ran an Linux container in AKS straight from the terminal
- 🔎 Verified outbound connectivity is routed through Azure NAT Gateway

## Conclusion
We have a robust and scalable software-defined gateway using Azure NAT Gateway for outbound connectivity. All our workloads deployed to AKS communicate with services not connected via Private Endpoint through the NAT Gateway and use the IP addresses we specified.

Find the code shown in this article on GitHub at https://github.com/rnemeth90/terraform-aks-with-nat-gateway.

