#!/bin/bash

sudo apt-get update -y
sudo apt-get install nginx -y
sudo systemctl enable --now nginx

# Get the VM name from the metadata service
VM_NAME=$(curl -H Metadata:true "http://169.254.169.254/metadata/instance/compute/name?api-version=2021-01-01&format=text")

# Get the Azure region from the metadata service
AZURE_REGION=$(curl -H Metadata:true "http://169.254.169.254/metadata/instance/compute/location?api-version=2021-01-01&format=text")

# Create a default web page
echo "<html>
<head>
<title>Hello from Azure! VM: $VM_NAME in Region: $AZURE_REGION</title>
</head>
<body>
<h3>This is the default web page for VM: $VM_NAME in Region: $AZURE_REGION</h3>
</body>
</html>" | sudo tee /var/www/html/index.html
