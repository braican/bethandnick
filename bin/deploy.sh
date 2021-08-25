#!/bin/bash

set -e

# Load configuration for current environment.
if [ -f .env ]; then
  source .env
else
  echo "Missing .env file!"
  exit 1
fi

HOST=${1:-$LINODE_HOST}
USER=${2:-$LINODE_USER}
BASEDIR=$(dirname "$0")
DEPLOYIGNORE=$BASEDIR/.deployignore

BUILD_DIR="./wp/"

if [ -z $HOST ] || [ -z $USER ]; then
  echo "Please pass the Linode SFTP host and user name for your site, or define them using \$LINODE_HOST and \$LINODE_USER env variables."
  exit 1
fi

echo "Deploying WordPress theme and core..."
rsync \
  -rlvz \
  --exclude-from="$DEPLOYIGNORE" \
  --ipv4 \
  --delete-after \
  -e 'ssh -o StrictHostKeyChecking=no' \
  --temp-dir=/tmp/ \
  $BUILD_DIR \
  $USER@$HOST:/var/www/bethandnick
