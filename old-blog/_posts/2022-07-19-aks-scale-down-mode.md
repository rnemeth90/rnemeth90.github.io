---
title: 'AKS Scale Down Mode'
author: Ryan
layout: post
excerpt: Lets learn how AKS Scale Down Mode works
categories:
    - 'Azure Kubernetes Service'
    - kubernetes
tags:
    - aks
    - 'azure kubernetes service'
    - kubernetes
    - storage
---

By default, scale-out operations performed manually or by cluster autoscale rules require the allocation and provisioning of new nodes, and scale-in operations delete nodes. Scale-down mode is a relatively newer concept that allows us to choose whether to delete _or_ deallocate nodes.


Having the ability to deallocate, rather than delete, nodes is a major performance benefit, as the time it takes to spin up new nodes will be significantly decreased. You will not be charged when nodes are deallocated. However, you will still need to pay for any storage that the node is using. Having persistent storage also means that any container images that were cached on the node will still be there when the node starts back up. This can be a major performance benefit if you are using Windows containers because the images for these containers are typically very large.

Scale down mode can be configured in several ways. Here, we will look at configuring it via the Azure CLI and Terraform.

Azure CLI:

```shell
az aks nodepool update --scale-down-mode Deallocate --name nplinux01 --cluster-name myAKSCluster --resource-group myResourceGroup

```

Terraform:
```hcl
resource "azurerm_kubernetes_cluster_node_pool" "nodepool" {
  name                  = "nplinux01"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.example.id
  vm_size               = "Standard_DS2_v2"
  node_count            = 2
  scale_down_mode       = "Deallocate"

  tags = {
    Environment = "lab"
  }
}
```

*At the time of this writing, Terraform does not support configuring scale-down mode for the default AKS node pool.*
*Node pools using ephemeral disks do not support 'deallocate' mode*