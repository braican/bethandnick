<?php
/**
 * Dealing with the admin page.
 *
 * @package Guestlist
 */

namespace Guestlist;

use Guestlist\EventsTable;

/**
 * Class to handle interactions with the Guestlist admin page.
 */
class Admin {
	/**
	 * The admin table holding the Events.
	 *
	 * @var \Guestlist\EventsTable
	 */
	public $events_table;

	/**
	 * Setup with hooks.
	 */
	public function hooks() {
		add_action( 'admin_menu', array( $this, 'create' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	/**
	 * Creates the menu page.
	 *
	 * @return void
	 */
	public function create() {
		$page_hook = \add_menu_page(
			'Guestlist',
			'Guestlist',
			'edit_posts',
			'guestlist',
			array( $this, 'load_events_list_view' ),
			'dashicons-groups'
		);

		/*
		 * The $page_hook_suffix can be combined with the load-($page_hook) action hook
		 * https://codex.wordpress.org/Plugin_API/Action_Reference/load-(page)
		 *
		 * The callback below will be called when the respective page is loaded
		 */
		add_action( 'load-' . $page_hook, array( $this, 'load_events_list_table_screen_options' ) );
	}

	/**
	 * Set up the events table and add screen options for the table.
	 *
	 * @return void
	 */
	public function load_events_list_table_screen_options() {
		$args = array(
			'label'   => 'Events Per Page',
			'default' => 5,
			'option'  => 'listings_per_page',
		);
		add_screen_option( 'per_page', $args );

		/*
		 * Instantiate the User List Table. Creating an instance here will allow the core
		 * WP_List_Table class to automatically load the table columns in the screen options panel.
		 */
		$this->events_table = new EventsTable();
	}

	/**
	 * The callback for the admin page display.
	 *
	 * @return void
	 */
	public function load_events_list_view() {
		$this->events_table->prepare_items();

		include_once GUESTLIST_PATH . 'views/events-list.php';
	}

	/**
	 * Enqueue static scripts and styles.
	 */
	public function enqueue() {
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


