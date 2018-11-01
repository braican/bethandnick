#!/bin/bash

set -e

HOST=${1:-$LINODE_HOST}
USER=${2:-$LINODE_USER}
BASEDIR=$(dirname "$0")
DEPLOYIGNORE=$BASEDIR/.deployignore

BUILD_DIR="$TRAVIS_BUILD_DIR/wp/"

if [ -z $HOST ] || [ -z $USER ]; then
  echo "Please pass the Linode SFTP host and user name for your site, or define them using \$LINODE_HOST and \$LINODE_USER env variables."
  exit 1
fi

echo "Deploying WordPress theme..."
rsync \
  -rlvz \
  --exclude-from="$DEPLOYIGNORE" \
  --ipv4 \
  --delete-after \
  -e 'ssh -o StrictHostKeyChecking=no' \
  --temp-dir=/tmp/ \
  $BUILD_DIR \
  $USER@$HOST:/var/www/bethandnick
