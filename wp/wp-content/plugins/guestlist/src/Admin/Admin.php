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
use Guestlist\Models\Guest;

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
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_guest_data' ) );
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

	/**
	 * Adds meta boxes.
	 *
	 * @return void
	 */
	public function add_meta_boxes() {
		add_meta_box(
			'gl_guest_data',
			'Guest Information',
			function( $post ) {
				$guest = new Guest( $post->ID );
				?>
				<label for="gl_guest_attending">Attending?</label>
				<select name="gl_guest_attending" id="gl_guest_attending">
					<option value="">Set attending status</option>
					<option value="1" <?php selected( $guest->attending(), 'Yes' ); ?>>Yes</option>
					<option value="-1" <?php selected( $guest->attending(), 'No' ); ?>>No</option>
				</select>
				<br><br>
				<label for="gl_guest_meal">Attending?</label>
				<select name="gl_guest_meal" id="gl_guest_meal">
					<option value="">Set meal option</option>
					<option value="Chicken" <?php selected( $guest->meal(), 'Chicken' ); ?>>Chicken</option>
					<option value="Swordfish" <?php selected( $guest->meal(), 'Swordfish' ); ?>>Swordfish</option>
					<option value="Vegetarian" <?php selected( $guest->meal(), 'Vegetarian' ); ?>>Vegetarian</option>
				</select>
				<?php
			},
			'gl_guest'
		);
	}

	/**
	 * Save the Guest data to the post.
	 *
	 * @param int $post_id ID.
	 *
	 * @return void
	 */
	public function save_guest_data( $post_id ) {
		if ( array_key_exists( 'gl_guest_attending', $_POST ) ) {
			if ( empty( $_POST['gl_guest_attending'] ) ) {
				delete_post_meta( $post_id, 'gl_attending' );
			} else {
				update_post_meta( $post_id, 'gl_attending', $_POST['gl_guest_attending'] );
			}
		}
		if ( array_key_exists( 'gl_guest_meal', $_POST ) ) {
			if ( empty( $_POST['gl_guest_meal'] ) ) {
				delete_post_meta( $post_id, 'gl_meal' );
			} else {
				update_post_meta( $post_id, 'gl_meal', $_POST['gl_guest_meal'] );
			}
		}
	}
}


