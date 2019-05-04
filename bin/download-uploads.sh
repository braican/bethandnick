#!/bin/bash

set -e

echo "Downloading assets from the remote uploads directory..."
echo
rsync -chavzP braican@69.164.211.156:/var/www/bethandnick/wp-content/uploads wp/wp-content
echo
echo "Done."
