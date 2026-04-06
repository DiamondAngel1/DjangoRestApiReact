#!/bin/bash
set -e  # зупиняє скрипт при помилці

cd DjangoApi/postapi
docker build -t django-api .
docker tag django-api:latest siuzanna/django-api:latest
docker push siuzanna/django-api:latest
echo "Done ---api---!"

cd ../../my-project
docker build -t my-post --build-arg VITE_API_BASE_URL=http://54.93.238.183:4512 .
docker tag my-post:latest siuzanna/my-post:latest
docker push siuzanna/my-post:latest
echo "Done ---client---!"

read -p "Press any key to exit..."