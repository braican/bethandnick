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
