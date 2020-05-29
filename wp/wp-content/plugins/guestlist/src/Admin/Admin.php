<?php
/**
 * Dealing with the admin page.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin;

use Guestlist\Admin\Views\EventList\EventList;
use Guestlist\Admin\Views\Event\Event;
use Guestlist\Admin\Views\Access\Access;

/**
 * Class to handle interactions with the Guestlist admin page.
 */
class Admin {
	/********* View variables *********/

	/**
	 * Event List page
	 *
	 * @var \Guestlist\Admin\Views\EventList\EventList
	 */
	public $event_list;

	/**
	 * Event page
	 *
	 * @var \Guestlist\Admin\Views\Event\Event
	 */
	public $event;

	/**
	 * Access page
	 *
	 * @var \Guestlist\Admin\Views\Access\Access
	 */
	public $access;


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
		$this->event      = new Event();
		$this->access     = new Access();
	}

	/**
	 * Creates the menu page.
	 *
	 * @return void
	 */
	public function create() {
		$cb         = array( $this->event_list, 'load' );
		$event_post = $this->is_event_page();

		if ( $event_post ) {
			$this->event->set( $event_post );
			$cb = array( $this->event, 'load' );
		}

		\add_menu_page(
			'Guestlist',
			'Guestlist',
			'edit_posts',
			'guestlist',
			$cb,
			'dashicons-groups'
		);

		\add_submenu_page(
			'guestlist',
			'API Access',
			'API Access',
			'edit_posts',
			'guestlist_access',
			array( $this->access, 'load' )
		);
	}

	/**
	 * Enqueue global scripts and styles.
	 */
	public function enqueue() {
		wp_enqueue_style(
			'guestlist_global_css',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'static/style.css',
			array(),
			GUESTLIST_VERSION
		);
	}

	/**
	 * If we're looking for the events page.
	 *
	 * @return int|false if there is no event.
	 */
	private function is_event_page() {
		$nonce = \wp_create_nonce( 'gl_admin_page' );

		if ( wp_verify_nonce( $nonce, 'gl_admin_page' )
			&& isset( $_GET['event'] )
			&& $_GET['event']
		) {
			return $_GET['event'];
		}

		return false;
	}
}

