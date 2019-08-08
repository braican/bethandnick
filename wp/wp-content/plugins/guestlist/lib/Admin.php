<?php
/**
 * Dealing with the admin page.
 *
 * @package Guestlist
 */

namespace Guestlist;

/**
 * Class to handle interactions with the Guestlist admin page.
 */
class Admin {
	/**
	 * Setup.
	 */
	public function __construct() {
	}


	/**
	 * Creates the menu page.
	 */
	public static function create() {
		\add_menu_page(
			'Guestlist',
			'Guestlist',
			'edit_posts',
			'guestlist',
			function() {
				load_template( GUESTLIST_PATH . 'templates/admin.php' );
			},
			'dashicons-groups'
		);
	}

	/**
	 * Enqueue static scripts and styles.
	 */
	public static function enqueue() {
		wp_enqueue_style(
			'guestlist_admin_css',
			GUESTLIST_URI . 'static/style.css',
			array(),
			GUESTLIST_VERSION
		);

		wp_enqueue_script(
			'guestlist_admin_js',
			GUESTLIST_URI . 'static/scripts.js',
			array( 'jquery' ),
			GUESTLIST_VERSION,
			true
		);
	}
}


