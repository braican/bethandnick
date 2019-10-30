<?php
/**
 * Repository for event data.
 *
 * @package Guestlist
 */

namespace Guestlist\Repositories;

use Guestlist\Models\Event;

/** Class */
class EventsRepo extends Repository {
	/**
	 * Parse query params with sensible defaults.
	 *
	 * @param array $args Arguments to send to the query that will get merged with the defaults.
	 *
	 * @return array
	 */
	protected function get_params( array $args = [] ) {
		$defaults = array(
			'post_type'      => Event::TYPE,
			'post_status'    => 'publish',
			'posts_per_page' => 20,
		);

		return wp_parse_args( $args, $defaults );
	}

	/**
	 * Get all events.
	 *
	 * @param array $args Additional parameters to tack onto the query.
	 *
	 * @return Repository
	 */
	public function all( array $args = [] ) {
		if ( ! isset( $args['posts_per_page'] ) ) {
			// Set a high, but sane, default to prevent full table scans.
			$args['posts_per_page'] = 1000;
		}

		$params = $this->get_params( $args );
		return $this->query( $params );
	}

}
