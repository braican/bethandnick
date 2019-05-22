#!/bin/bash

set -e

echo "Starting WordPress..."
echo
docker-compose up -d
echo

echo "Running composer install ..."
echo
docker-compose exec wordpress composer install
echo

echo "Running yarn install ..."
echo
yarn install
echo

echo "Starting static dev server and front end ..."
echo
yarn develop
echo