<?php
/**
 * A guest list for a single event.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Guests;

use Guestlist\Repositories\GuestRepo;

/** Class */
class Guests {
	/**
	 * The ID of the event.
	 *
	 * @var int
	 */
	public $event_id;

	/**
	 * The Guests repo for guests in this event.
	 *
	 * @var \Guestlist\Repositories\GuestRepo
	 */
	public $guests;

	/**
	 * Init this view with the specific event.
	 *
	 * @param int $event WordPress event ID.
	 *
	 * @return void
	 */
	public function __construct( int $event_id = null ) {
		$this->event_id = $event_id;

		if ( null !== $this->event_id ) {
			$guest_repo   = new GuestRepo( $this->event_id );
			$this->guests = $guest_repo->all();
		}
	}

	/**
	 * Gets the event data.
	 *
	 * @return WP_Post
	 */
	public function get_event() {
		if ( null !== $this->event_id ) {
			return get_post( $this->event_id );
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
		include_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'template-guests.php';
	}
}
