<?php

define('BETHANDNICK_THEME_URI', get_template_directory_uri());
define('BETHANDNICK_THEME_PATH', dirname(__FILE__) . '/');

// Autoload project Composer dependencies.
require __DIR__ . '/vendor/autoload.php';

// Set up the site
$SITE = BethAndNick\Site::get_instance();


// init the api
$API = BethAndNick\API::get_instance();