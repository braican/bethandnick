<?php
/**
 * Dealing with the admin page.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin;

use Guestlist\Admin\Views\EventList\EventList;

define( 'GUESTLIST_ADMIN_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GUESTLIST_ADMIN_URI', trailingslashit( plugin_dir_url( __FILE__ ) ) );

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
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
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
		\add_menu_page(
			'Guestlist',
			'Guestlist',
			'edit_posts',
			'guestlist',
			array( $this->event_list, 'load' ),
			'dashicons-groups'
		);
	}

	/**
	 * Enqueue static scripts and styles.
	 */
	public function enqueue() {
		wp_enqueue_style(
			'guestlist_admin_css',
			GUESTLIST_ADMIN_URI . 'static/style.css',
			array(),
			GUESTLIST_VERSION
		);

		wp_enqueue_script(
			'guestlist_admin_js',
			GUESTLIST_ADMIN_URI . 'static/scripts.js',
			array( 'jquery' ),
			GUESTLIST_VERSION,
			true
		);
	}
}


