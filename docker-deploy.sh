#!/bin/sh

date=$(date +%s)
image_name="$DOCKERHUB_USERNAME/e-commerce-backend"
tag="$image_name:$date"
latest="$image_name:latest"

docker build . --file Dockerfile -t "$tag"
docker tag "$tag" "$latest"

docker push "$tag"
docker push "$latest"