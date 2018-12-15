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
        // Filter data for the default `page` endpoint.
        add_filter('rest_prepare_page', array($this, 'add_custom_fields'), 10, 3);

        // Create some custom endpoints.
        add_action('rest_api_init', array($this, 'setup_endpoints'));
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
        $page_image = $this->get_page_image($post->ID);
        $response_data['page_image'] = $page_image;

        // If we have no additional fields bail early.
        if ($fields){
            foreach ($fields as $field_name => $value){
                $response_data[$field_name] = $value;
            }
        }

        // Commit the API result var to the API endpoint
        $data->set_data( $response_data );

        return $data;
    }


    /**
     * Register the custom endpoints.
     * 
     * @return void
     */
    public function setup_endpoints() {
        register_rest_route($this->namespace, 'info', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_global_info')
        ));
    }


    // -------------------------------------------------
    //
    // API endpoint builders
    //
    // -------------------------------------------------


    /**
     * Callback method that will return the global informations.
     * 
     * @return array Data containing wedding information.
     */
    public function get_global_info() {
        return array(
            'wedding_date'      => get_field('wedding_date', 'option'),
            'venue_name'        => get_field('venue_name', 'option'),
            'venue_information' => get_field('venue_information', 'option'),
        );
    }


    // -------------------------------------------------
    //
    // Util
    //
    // -------------------------------------------------


    /**
     * Util function to get the featured image url for a page, with a global fallback if the given
     *  page doesn't have a featured image set.
     * 
     * @param int  $postId  WP Post ID.
     * 
     * @return boolean|string False if no image exists, or the url to the image.
     */
    private function get_page_image($postId) {
        $image = get_field('page_featured_image', $postId) ?: get_field('site_image', 'option');
        if (is_array($image)) {
            $image = $image['ID'];
        }
        $imageObj = wp_get_attachment_image_src($image, 'featured');
        if (!$imageObj) {
            return false;
        }
        return $imageObj[0];
    }
}