<?php
/**
 * Sets up the API.
 *
 * @package Guestlist
 */

namespace Guestlist\Api;

use Guestlist\Api\Endpoints\Search;
use Guestlist\Api\Endpoints\Update;

/** Class */
class Api {
	const NAMESPACE = 'guestlist/v1';

	/**
	 * Set up the API by creating some endpoints.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'setup_endpoints' ) );
	}

	/**
	 * Sets up the endpoints.
	 *
	 * @return void
	 */
	public function setup_endpoints() {
		$search = new Search( '/search' );
		$update = new Update( '/update' );
	}
}
