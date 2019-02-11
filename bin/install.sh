#!/bin/bash

set -e

echo "Bringing up project containers..."
echo
docker-compose up --build -d
echo

echo "Installing PHP dependencies..."
echo
docker-compose exec wordpress composer install
echo

echo "Installing Gatsby and front-end tools..."
echo
yarn install
echo

echo "-------------------------------"
echo "Install completed successfully!"
echo "-------------------------------"
echo
echo "Run './bin/start.sh' and get to work!"
echo

