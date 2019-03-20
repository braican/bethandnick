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
        add_action('rest_api_init', array($this, 'setupEndpoints'));

        // Nullify falsey values
        add_filter('acf/format_value/type=image', array($this, 'nullifyEmpty'), 100, 3);
    }

    /**
     * If an ACF field is empty, make sure it returns null rather than a falsey value so that
     *  GraphQL can parse it the right way.
     *
     * @param mixed $value   The value loaded from the database.
     * @param mixed $post_id The post that contains the field.
     * @param array $field   Settings for the field.
     *
     * @return mixed Null if the field is false or undefined, the value otherwise.
     */
    public function nullifyEmpty($value, $post_id, $field) {
        if (empty($value)) {
            return null;
        }

        return $value;
    }


    /**
     * Register the custom endpoints.
     *
     * @return void
     */
    public function setupEndpoints() {
        $globals = new \BethAndNick\Endpoint\Globals();
        $globals = new \BethAndNick\Endpoint\Gallery();
    }
}