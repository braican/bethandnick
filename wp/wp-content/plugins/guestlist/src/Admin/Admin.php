<?php
/**
 * Dealing with the admin page.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin;

use Guestlist\Admin\Views\EventList\EventList;
use Guestlist\Admin\Views\Guests\Guests;

/**
 * Class to handle interactions with the Guestlist admin page.
 */
class Admin {
	/********* View variables *********/

	/**
	 * Event List
	 *
	 * @var \Guestlist\Admin\Views\EventList\EventList
	 */
	public $event_list;


	/********* Methods *********/

	/**
	 * The constructor to set up the admin.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->setup_views();
	}

	/**
	 * Setup with hooks.
	 *
	 * @return void
	 */
	public function hooks() {
		add_action( 'admin_menu', array( $this, 'create' ) );
	}

	/**
	 * Adds the specific admin views.
	 *
	 * @return void
	 */
	public function setup_views() {
		$this->event_list = new EventList();
	}

	/**
	 * Creates the menu page.
	 *
	 * @return void
	 */
	public function create() {
		$cb = array( $this->event_list, 'load' );

		if ( isset( $_GET['event' ] ) && $_GET['event'] ) {
			$guestlist = new Guests( $_GET['event'] );
			$cb        = array( $guestlist, 'load' );
		}

		\add_menu_page(
			'Guestlist',
			'Guestlist',
			'edit_posts',
			'guestlist',
			$cb,
			'dashicons-groups'
		);
	}
}


