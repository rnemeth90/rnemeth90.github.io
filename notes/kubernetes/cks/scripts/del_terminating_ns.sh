#!/bin/bash

namespaces=$(kubectl get ns --field-selector=status.phase==Terminating -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}')

if [ -z "$namespaces" ]
then
  echo "No namespaces to delete."
  exit
else
  for namespace in $namespaces
  do
    echo "[Removing Namespace]: $namespace"
    kubectl get namespace $namespace -o json | tr -d "\n" | sed "s/\"finalizers\": \[[^]]\+\]/\"finalizers\": []/" | kubectl replace --raw /api/v1/namespaces/$namespace/finalize -f - > /dev/null 2>&1
  done
fi
