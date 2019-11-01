<?php
/**
 * Admin view for the events list.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\EventList;

use Guestlist\Repositories\EventsRepo;
use Guestlist\Models\Event;

/** Class */
class EventList {
	/**
	 * The repo for all events.
	 *
	 * @var \Guestlist\Repositories\EventsRepo
	 */
	public $events;

	/**
	 * The label for the action for the form submission.
	 *
	 * @var string
	 */
	public $action = 'guestlist_add_event';

	/**
	 * Constructor to set everything up.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->set_events();

		add_action( 'admin_action_' . $this->action, array( $this, 'handle_add_event' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	/**
	 * Enqueue static scripts and styles.
	 */
	public function enqueue() {
		wp_enqueue_style(
			'guestlist_view_eventlist_css',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'style.css',
			array(),
			GUESTLIST_VERSION
		);

		wp_enqueue_script(
			'guestlist_view_eventlist_js',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'scripts.js',
			array( 'jquery' ),
			GUESTLIST_VERSION,
			true
		);
	}

	/**
	 * The callback for the page display.
	 *
	 * @return void
	 */
	public function load() {
		include_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'template-event-list.php';
	}

	/**
	 * The list of events.
	 *
	 * @return void
	 */
	private function set_events() {
		$events_repo  = new EventsRepo();
		$this->events = $events_repo->all();
	}

	/**
	 * Retrieve the list of events.
	 *
	 * @return array
	 */
	public function get_events() {
		if ( null !== $this->events ) {
			return $this->events->get();
		}

		return [];
	}


	/**
	 * Are there events to display?
	 *
	 * @return boolean
	 */
	public function have_events() {
		if ( null !== $this->events ) {
			return $this->events->have_posts();
		}

		return false;
	}

	/**
	 * Handles the form submission.
	 *
	 * @return void
	 */
	public function handle_add_event() {

		error_log(print_r('sadsadsad', true));

		$nonce = wp_verify_nonce( $_POST['nonce'], 'add_new_event' );
		if ( false === $nonce ) {
			die( 'Security check' );
		}

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

		wp_redirect( $_SERVER['HTTP_REFERER'] );
		exit();

	}
}

