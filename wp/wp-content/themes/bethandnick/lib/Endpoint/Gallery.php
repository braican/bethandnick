<?php
/**
 * Gallery endpoint.
 *
 * @package BethAndNick
 */

namespace BethAndNick\Endpoint;

/**
 * Creates an endpoint for the Gallery.
 */
class Gallery extends Base {
	/**
	 * Base URL for the endpoint route.
	 *
	 * @var string
	 */
	protected $route = 'gallery';


	/**
	 * Sets up the content for the endpoint.
	 *
	 * @return void
	 */
	public function set_endpoint_content() {
		$this->endpoint_content = array(
			'gallery' => get_field( 'image_gallery', 'option' ),
		);
	}
}
