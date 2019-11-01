<?php
/**
 * A guest list for a single event.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Event;

use Guestlist\Models\Event as EventModel;
use Guestlist\Repositories\GuestRepo;

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
	 * Init this view with the specific event.
	 *
	 * @param string $event_id WordPress event ID.
	 *
	 * @return void
	 */
	public function __construct( $event_id = null ) {
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
}
