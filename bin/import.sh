#!/bin/bash

set -e

if [[ $# -eq 0 ]] ; then
    echo "ERROR: No file specified"
    echo "Usage: import.sh path/to/import/file.sql"
    exit 0
fi

FILE=$1
FILENAME="${fullpath##*/}"

if [ ! -f $FILE ]; then
    echo "ERROR: File not found"
    exit 0
fi

echo "Importing database $FILENAME"
cp $FILE wp/_tmp
docker-compose exec wordpress bash -c "wp db import /var/www/html/_tmp && rm /var/www/html/_tmp"
echo "done"