#!/bin/sh

date=$(date +%s)
tag="$DOCKERHUB_USERNAME/e-commerce-backend:$date"
latest="$DOCKERHUB_USERNAME/e-commerce-backend:latest"

docker build . --file Dockerfile -t "$tag" -t "$latest"

docker push "$tag"
docker push "$latest"