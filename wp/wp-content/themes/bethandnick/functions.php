<?php

define('BETHANDNICK_THEME_URI', get_template_directory_uri());
define('BETHANDNICK_THEME_PATH', dirname(__FILE__) . '/');

require_once 'lib/BethAndNickAPI.php';

// init the api
$API = BethAndNickAPI::get_instance();