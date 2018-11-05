<?php

namespace BethAndNick;

class API {
    
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
        add_filter('rest_prepare_page', array($this, 'add_custom_fields'), 10, 3);
    }


    /**
     * Adds all the custom ACF fields to the API output.
     * 
     * @param WP_REST_Response  $data     Data returned via the endpoint.
     * @param WP_Post           $post     The post from WordPress.
     * @param WP_REST_Request   $request  API Request object.
     * 
     * @return WP_REST_Response  The post data with the added field values.
     */
    public function add_custom_fields($data, $post, $request) {
        $response_data = $data->get_data();

        // Bail early if there's an error
        if ( $request['context'] !== 'view' || is_wp_error( $data ) ) {
            return $data;
        }

        // Get all ACF fields
        $fields = get_fields($post->ID);
        
        // If we have no additional fields bail early.
        if (!$fields){
            return $data;
        }

        foreach ($fields as $field_name => $value){
            if ($field_name === 'page_featured_image' && ($img = wp_get_attachment_image_src($value, 'featured'))) {
                $value = $img[0];
            }

            $response_data[$field_name] = $value;
        }

        // Commit the API result var to the API endpoint
        $data->set_data( $response_data );

        return $data;
    }
}