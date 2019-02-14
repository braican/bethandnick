<?php

namespace BethAndNick;

class API {
    /**
     * The unique instance of the API class.
     *
     * @var BethAndNick\API
     */
    private static $instance;

    /**
     * The namespace for the API
     *
     * @var string
     */
    private $namespace = 'bethandnick/v2';

    /**
     * Gets the instance of the class.
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
     * Constructor is private in a singleton.
     */
    private function __construct() {
        // Create some custom endpoints.
        add_action('rest_api_init', array($this, 'setup_endpoints'));
    }


    /**
     * Register the custom endpoints.
     *
     * @return void
     */
    public function setup_endpoints() {
        register_rest_route(
            $this->namespace,
            'info',
            array(
                'methods'  => 'GET',
                'callback' => array($this, 'get_global_info'),
            )
        );
    }


    /**
     * Callback method that will return the global informations.
     *
     * @return array Data containing wedding information.
     */
    public function get_global_info() {
        return array(
            'wordpress_id'      => 101,
            'wedding_date'      => get_field('wedding_date', 'option'),
            'venue_name'        => get_field('venue_name', 'option'),
            'venue_information' => get_field('venue_information', 'option'),
        );
    }

}