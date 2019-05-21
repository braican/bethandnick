<?php
/**
 * Set up the API.
 *
 * @package BethAndNick
 */

namespace BethAndNick;

/**
 * API class.
 */
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
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor is private in a singleton.
	 */
	private function __construct() {
		// Create some custom endpoints.
		add_action( 'rest_api_init', array( $this, 'setup_endpoints' ) );

		// Nullify falsey values.
		add_filter( 'acf/format_value/type=image', array( $this, 'nullify_empty' ), 100, 3 );
	}

	/**
	 * If an ACF field is empty, make sure it returns null rather than a falsey value so that
	 *  GraphQL can parse it the right way.
	 *
	 * @param mixed $value The value loaded from the database.
	 *
	 * @return mixed Null if the field is false or undefined, the value otherwise.
	 */
	public function nullify_empty( $value ) {
		if ( empty( $value ) ) {
			return null;
		}

		return $value;
	}

	/**
	 * Register the custom endpoints.
	 *
	 * @return void
	 */
	public function setup_endpoints() {
		$globals = new \BethAndNick\Endpoint\Globals();
		$globals = new \BethAndNick\Endpoint\Gallery();
	}
}
