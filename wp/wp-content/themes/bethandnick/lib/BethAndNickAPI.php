<?php

class BethAndNickAPI {
    
    /**
     * The unique instance of the API class.
     * @var BethAndNick\API
     */
    private static $instance;

    /**
     * The namespace for the API
     * @var string
     */
    public $namespace = 'bethandnick/v1';

    /**
     * Gets an instance of our plugin.
     *
     * @return BethAndNick\API
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
 
        return self::$instance;
    }

    /**
     * Constructor, empty in a singleton.
     */
    private function __construct() {}
}