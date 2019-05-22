<?php
/**
 * Base class for endpoints.
 *
 * @package BethAndNick
 */

namespace BethAndNick\Endpoint;

/**
 * Create an endpoint for the about page content.
 */
class Base {
	/**
	 * Namespace for the enpoint.
	 *
	 * @var string
	 */
	private $namespace = 'bethandnick/v1';

	/**
	 * Route path for the endpoint.
	 *
	 * @var string
	 */
	protected $route = '';

	/**
	 * Content for the endpoint. This should be overwritten in child classes.
	 *
	 * @var array
	 */
	protected $endpoint_content = array();

	/**
	 * Builds the rest route.
	 */
	public function __construct() {
		$this->set_endpoint_content();

		$route_args = array(
			'methods'  => 'GET',
			'callback' => array( $this, 'get_page_content' ),
		);

		register_rest_route( $this->namespace, $this->route, $route_args );
	}


	/**
	 * Placeholder parent class setter. This should be overridden in child classes to set the
	 * content on the endpoint.
	 *
	 * @return void
	 */
	protected function set_endpoint_content() {

	}


	/**
	 * Get the content to return for the page.
	 *
	 * @return array
	 */
	public function get_page_content() {
		$content = array(
			'wordpress_id' => 100,
		);

		return wp_parse_args( $this->endpoint_content, $content );
	}
}
