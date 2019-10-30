<?php
/**
 * Repository for a group of guests.
 *
 * @package Guestlist
 */

namespace Guestlist\Repositories;

use Guestlist\Models\Guest;

/** Class */
class GuestRepo extends Repository {
	/**
	 * The event to get guests from.
	 *
	 * @var int
	 */
	private $event_id;

	/**
	 * Can optionally pass the event that we should be getting guests from.
	 *
	 * @param int $event_id The event to get guests from.
	 *
	 * @return void
	 */
	public function __construct( int $event_id = null ) {
		parent::__construct();

		$this->event_id = $event_id;
	}

	/**
	 * Parse query params with sensible defaults.
	 *
	 * @param array $args Arguments to send to the query that will get merged with the defaults.
	 *
	 * @return array
	 */
	protected function get_params( array $args = [] ) {
		$defaults = array(
			'post_type'      => Guest::TYPE,
			'post_status'    => 'publish',
			'posts_per_page' => 60,
		);

		if ( null !== $this->event_id ) {
			$defaults['meta_key']   = 'gl_guest_event';
			$defaults['meta_value'] = $this->event_id;
		}

		return wp_parse_args( $args, $defaults );
	}

	/**
	 * Get all guests.
	 *
	 * @param array $args Additional parameters to tack onto the query.
	 *
	 * @return Repository
	 */
	public function all( array $args = [] ) {
		if ( ! isset( $args['posts_per_page'] ) ) {
			// Set a high, but sane, default to prevent full table scans.
			$args['posts_per_page'] = 6000;
		}

		$params = $this->get_params( $args );
		return $this->query( $params );
	}

}
