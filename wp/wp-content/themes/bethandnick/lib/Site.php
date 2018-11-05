<?php

namespace BethAndNick;

class Site {

    /**
     * The unique instance of the Site class.
     * @var BethAndNick\Site
     */
    private static $instance;

    /**
     * Gets the instance of the class.
     * 
     * @return BethAndNick\Site
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Constructor is private in a singleton.
     */
    private function __construct() {
        $this->create_image_sizes();
    }


    /**
     * Set up image sizes.
     * 
     * @return void
     */
    private function create_image_sizes() {
        add_image_size('featured', 1200, 1200, false);
    }
}