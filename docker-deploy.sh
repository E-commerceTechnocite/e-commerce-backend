#!/bin/sh

date=$(date +%s)
tag=jester0027/e-commerce-backend:"$date"

docker build . --file Dockerfile --tag "$tag"

docker push "$tag"