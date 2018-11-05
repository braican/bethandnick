#!/bin/bash

set -e

echo "Creating a file at /var/log/error.log to output php errors to..."
echo 
docker-compose exec wordpress bash -c "
    touch /usr/local/etc/php/php.ini &&
    echo -e \"log_errors = on\r\nerror_log = /var/log/error.log\" > /usr/local/etc/php/php.ini &&
    touch /var/log/error.log && 
    chmod 777 /var/log/error.log &&
    supervisorctl restart php-fpm
"
echo
echo "Ready to go. You can view the error log by running \"docker-compose exec wordpress tail -f /var/log/error.log\""