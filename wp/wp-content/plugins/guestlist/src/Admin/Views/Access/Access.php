<?php
/**
 * Admin view for the guestlist access settings, where we'll add API keys.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Access;

use Guestlist\Admin\Store;

/** Class */
class Access {
	/**
	 * The label for the action for the form submission.
	 *
	 * @var string
	 */
	public $action = 'guestlist_generate_api_key';

	/**
	 * Set everything up.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_action_' . $this->action, array( $this, 'handle_generate_api_key' ) );
	}

	/**
	 * The callback for the page display.
	 *
	 * @return void
	 */
	public function load() {
		include_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'template-access.php';
	}

	/**
	 * Gets the saved API key.
	 *
	 * @return string
	 */
	public function get_api_key() {
		$api_key = Store::get( 'gl_api_key' );
		return $api_key;
	}

	/**
	 * Handle the API key generation.
	 *
	 * @return void
	 */
	public function handle_generate_api_key() {
		$nonce = wp_verify_nonce( $_POST['nonce'], 'generate_api_key' );
		if ( false === $nonce ) {
			die( 'Security check' );
		}

		$current_user = wp_get_current_user();
		$email        = get_userdata( $current_user->ID )->user_email;
		$key          = md5(uniqid( $email, true ) );

		Store::set( 'gl_api_key', $key );

		wp_redirect( $_SERVER['HTTP_REFERER'] );
		exit();
	}
}
