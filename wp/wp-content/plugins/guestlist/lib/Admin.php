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
}


