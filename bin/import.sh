#!/bin/bash

set -e

if [[ $# -eq 0 ]] ; then
    echo "ERROR: No file specified"
    echo "Usage: ./bin/import path/to/import/file.sql"
    exit 0
fi


IMPORTFILE=$1
TMPDIR="./wp/wp-content/themes/bethandnick/_tmp_db"
TMPFILE="$TMPDIR/import"

if [ ! -f $IMPORTFILE ]; then
    echo "ERROR: File not found!"
    exit 0
fi

if [ ! ${IMPORTFILE: -4} == ".sql" ]; then
    echo "ERROR: File needs to be an sql file"
    exit 0
fi

if [ ! -d $TMPDIR ]; then
    mkdir $TMPDIR
fi

echo "Importing dump $IMPORTFILE"
cp $IMPORTFILE $TMPFILE
docker-compose exec wordpress wp db import ./_tmp_db/import
rm $TMPFILE
rmdir $TMPDIR
