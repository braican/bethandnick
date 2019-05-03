FROM richarvey/nginx-php-fpm:1.5.0

RUN apk update

RUN apk add \
  mysql-client \
  openssl \
  msmtp

# Configure msmtp
RUN { \
    echo "account default"; \
    echo "host mailhog"; \
    echo "port 1025"; \
    echo "auto_from on"; \
  } > /etc/msmtprc

# Configure PHP to use msmtp for sending mail
RUN { \
    echo 'sendmail_path = "/usr/bin/msmtp -t -i"'; \
  } > /usr/local/etc/php/conf.d/mail.ini

# Install and configure WP CLI
RUN wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; \
	chmod +x wp-cli.phar; \
	mv wp-cli.phar /usr/local/bin/; \
	# Workaround for root usage scolding.
	echo -e "#!/bin/bash\n\n/usr/local/bin/wp-cli.phar \"\$@\" --allow-root\n" > /usr/local/bin/wp; \
	chmod +x /usr/local/bin/wp; \
	# Add bash completons for interactive usage.
	wget https://github.com/wp-cli/wp-cli/raw/master/utils/wp-completion.bash; \
	mv wp-completion.bash $HOME; \
	echo -e "source $HOME/wp-completion.bash\n" > $HOME/.bashrc

# Copy the rest of this theme into place
COPY wp /var/www/html
