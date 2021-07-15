<?php
/**
 * A guest list for a single event.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Event;

use Guestlist\Models\Event as EventModel;
use Guestlist\Models\Guest;
use Guestlist\Models\GuestGroup;
use Guestlist\Repositories\GuestRepo;
use Guestlist\Admin\Notices;
use Guestlist\Admin\Store;

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
	const ACTION_ADD = 'guestlist_add_guest';

	/**
	 * The action label for editing the attending status for a guest.
	 *
	 * @var string
	 */
	const ACTION_EDIT_ATTENDING = 'guestlist_edit_guest_attending';

	/**
	 * The action label for editing the meal for a guest.
	 *
	 * @var string
	 */
	const ACTION_EDIT_MEAL = 'guestlist_edit_guest_meal';

	/**
	 * Init this view with some hooks.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'admin_action_' . self::ACTION_ADD, array( $this, 'handle_add_guest' ) );
		add_action( 'wp_ajax_' . self::ACTION_EDIT_ATTENDING, array( $this, 'handle_edit_attending' ) );
		add_action( 'wp_ajax_' . self::ACTION_EDIT_MEAL, array( $this, 'handle_edit_meal' ) );
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
	 * Pagination.
	 *
	 * @return int
	 */
	public function get_page_count() {
		return (int) $this->guests->get_pages();
	}

	/**
	 * The current page.
	 *
	 * @return int
	 */
	public function get_current_page() {
		if ( isset( $_GET['paged'] ) && $_GET['paged'] ) {
			return (int) $_GET['paged'];
		}

		return 1;
	}

	/**
	 * Get the paginated url.
	 *
	 * @param mixed $page The page value to add to the query param.
	 *
	 * @return string
	 */
	public function get_paginated_link( $page ) {
		$curent_url = add_query_arg( $_SERVER['QUERY_STRING'], '', admin_url( 'admin.php' ) );

		if ( false === $page ) {
			return remove_query_arg( 'paged', $curent_url );
		}

		return add_query_arg( 'paged', $page, $curent_url );
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
			die( 'The security check failed.' );
		}

		if ( ! isset( $_POST['event'] ) ) {
			die( 'Submission is invalid: an event is required.' );
		}

		$event       = sanitize_text_field( $_POST['event'] );
		$group_name  = sanitize_text_field( $_POST['guest_group_name'] );
		$street      = sanitize_text_field( $_POST['guest_street'] );
		$city        = sanitize_text_field( $_POST['guest_city'] );
		$state       = sanitize_text_field( $_POST['guest_state'] );
		$zip         = sanitize_text_field( $_POST['guest_zip'] );
		$address     = "$street $city, $state $zip";
		$group_title = "$group_name / $address";

		$collected_data = array(
			'group_name'     => $group_name,
			'street'         => $street,
			'city'           => $city,
			'state'          => $state,
			'zip'            => $zip,
			'address'        => $address,
			'gl_guest_event' => $event,
		);

		$guests = array_filter( $_POST['guest_name'] );

		if ( ! $guests ) {
			Notices::add( 'Please add at least one guest name', 'error', true );
			Store::set( 'new_guest_data', $collected_data );
			wp_redirect( $_SERVER['HTTP_REFERER'] );
			exit();
		}

		$guest_ids = array();

		$new_group = wp_insert_post(
			array(
				'post_title'  => $group_title,
				'post_status' => 'publish',
				'post_type'   => GuestGroup::TYPE,
				'meta_input'  => $collected_data,
			)
		);

		foreach ( $guests as $guest ) {
			$guest_id = wp_insert_post(
				array(
					'post_title'  => sanitize_text_field( $guest ),
					'post_status' => 'publish',
					'post_type'   => Guest::TYPE,
					'meta_input'  => array_merge(
						$collected_data,
						array( 'gl_group' => $new_group )
					),
				)
			);

			array_push( $guest_ids, $guest_id );
		}

		update_post_meta( $new_group, 'gl_guests', $guest_ids );

		$message = 'Successfully added the guest';
		if ( count( $guests ) > 1 ) {
			$message .= 's';
		}
		$message .= '.';

		Notices::add( $message, 'success', true );
		wp_redirect( $_SERVER['HTTP_REFERER'] );
		exit();
	}

	/**
	 * Handles the form submission for the attending edit.
	 *
	 * @return void
	 */
	public function handle_edit_attending() {
		// check the nonce.
		if ( ! isset( $_POST['nonce'] ) || check_ajax_referer( 'edit_guest_attending_' . $_POST['guest_id'], 'nonce', false ) === false ) {
			wp_send_json_error();
		}

		if ( ! isset( $_POST['guest_id'] ) || ! $_POST['guest_id'] ) {
			wp_send_json_error( 'Invalid guest ID.' );
		}

		$update = update_post_meta( $_POST['guest_id'], 'gl_attending', $_POST['guest_attending'] );
		wp_send_json_success( $update );
	}

	/**
	 * Handles the form submission for the meal edit.
	 *
	 * @return void
	 */
	public function handle_edit_meal() {
		// check the nonce.
		if ( ! isset( $_POST['nonce'] ) || check_ajax_referer( 'edit_guest_meal_' . $_POST['guest_id'], 'nonce', false ) === false ) {
			wp_send_json_error();
		}

		if ( ! isset( $_POST['guest_id'] ) || ! $_POST['guest_id'] ) {
			wp_send_json_error( 'Invalid guest ID.' );
		}

		$update = update_post_meta( $_POST['guest_id'], 'gl_meal', $_POST['guest_meal'] );
		wp_send_json_success( $update );
	}
}
