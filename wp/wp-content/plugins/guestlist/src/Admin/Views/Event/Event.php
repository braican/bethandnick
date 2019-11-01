<?php
/**
 * A guest list for a single event.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Event;

use Guestlist\Models\Event as EventModel;
use Guestlist\Repositories\GuestRepo;
use Guestlist\Admin\Notices;

/** Class */
class Event {
	/**
	 * The event.
	 *
	 * @var WP_Post
	 */
	public $event;

	/**
	 * The Guests repo for guests in this event.
	 *
	 * @var \Guestlist\Repositories\GuestRepo
	 */
	public $guests;

	/**
	 * The label for the action for the form submission.
	 *
	 * @var string
	 */
	public $action = 'guestlist_add_guest';

	/**
	 * Init this view with some hooks.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'admin_action_' . $this->action, array( $this, 'handle_add_guest' ) );
	}

	/**
	 * Sets up this event view with the correct event.
	 *
	 * @param int $event_id ID of the event we're setting up.
	 *
	 * @return void
	 */
	public function set( $event_id ) {
		if (
			null !== $event_id
			&& 'publish' === get_post_status( $event_id )
			&& EventModel::TYPE === get_post_type( $event_id )
		) {
			$this->event  = get_post( $event_id );
			$guest_repo   = new GuestRepo( $event_id );
			$this->guests = $guest_repo->all();
		}
	}


	/**
	 * Enqueue static scripts and styles.
	 */
	public function enqueue() {
		wp_enqueue_style(
			'guestlist_view_event_css',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'style.css',
			array(),
			GUESTLIST_VERSION
		);

		wp_enqueue_script(
			'guestlist_view_event_js',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'scripts.js',
			array( 'jquery' ),
			GUESTLIST_VERSION,
			true
		);
	}

	/**
	 * Gets the event data.
	 *
	 * @return WP_Post
	 */
	public function get_event() {
		if ( null !== $this->event ) {
			return $this->event;
		}

		return null;
	}

	/**
	 * Gets all the guests for this event.
	 *
	 * @return array
	 */
	public function get_guests() {
		return $this->guests->get();
	}

	/**
	 * Are tere guests to display?
	 *
	 * @return boolean
	 */
	public function have_guests() {
		if ( null !== $this->guests ) {
			return $this->guests->have_posts();
		}

		return false;
	}

	/**
	 * The callback for the page display.
	 *
	 * @return void
	 */
	public function load() {
		include_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'template-event.php';
	}

	/**
	 * Handles the form submission.
	 *
	 * @return void
	 */
	public function handle_add_guest() {
		if (
			! isset( $_POST['nonce'] )
			|| false === wp_verify_nonce( $_POST['nonce'], 'add_guest' )
		) {
			die( 'The security check failed' );
		}

		error_log(print_r($_POST['guest_name'], true));

		// $event_name     = sanitize_text_field( $_POST['event_name'] );
		// $event_location = sanitize_text_field( $_POST['event_location'] );
		// $event_date     = sanitize_text_field( $_POST['event_date'] );

		// $new_event = wp_insert_post(
		// 	array(
		// 		'post_title'  => $event_name,
		// 		'post_status' => 'publish',
		// 		'post_type'   => Event::TYPE,
		// 		'meta_input'  => array(
		// 			'event_location' => $event_location,
		// 			'event_date'     => $event_date,
		// 		),
		// 	)
		// );

		Notices::add( 'Successfully added the guest.', 'success', true );
		wp_redirect( $_SERVER['HTTP_REFERER'] );
		exit();
	}
}
