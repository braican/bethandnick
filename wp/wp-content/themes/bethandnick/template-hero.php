<?php
/**
 * Template Name: Hero Image Page
 *
 * Index file for the Markup theme. Since WordPress is only being used to provide a REST API, this
 * theme file will just redirect the user to the admin.
 *
 * @package BethAndNick
 */

header( 'HTTP/1.1 301 Moved Permanently' );
header( 'Location: ' . get_admin_url() );
exit();
