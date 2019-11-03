<?php
/**
 * Repository for a group of guests.
 *
 * @package Guestlist
 */

namespace Guestlist\Repositories;

use Guestlist\Models\Guest;
use Guestlist\Models\GuestGroup;

/** Class */
class GuestRepo extends Repository {
	/**
	 * The event to get guests from.
	 *
	 * @var string
	 */
	private $event_id;

	/**
	 * Can optionally pass the event that we should be getting guests from.
	 *
	 * @param string $event_id The event to get guests from.
	 *
	 * @return void
	 */
	public function __construct( $event_id = null ) {
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
			'post_type'      => GuestGroup::TYPE,
			'post_status'    => 'publish',
			'posts_per_page' => 60,
			'orderby'        => 'post_title',
			'order'          => 'ASC',
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
			$args['posts_per_page'] = 20;
		}

		$paged = isset( $_GET['paged'] ) ? $_GET['paged'] : false;

		if ( $paged && $paged > 1 ) {
			$args['paged'] = $paged;
		}

		$params = $this->get_params( $args );
		return $this->query( $params );
	}

	/**
	 * Maps the guests in a group to an array of it's own.
	 *
	 * @param WP_Post $group Group post data.
	 *
	 * @return WP_Post
	 */
	public function map_group_guests( $group ) {
		$group_guests = get_post_meta( $group->ID, 'gl_guests', true );

		if ( ! $group_guests ) {
			return null;
		}

		$group->address = get_post_meta( $group->ID, 'address', true );
		$group->guests  = array_map( function( $p ) {
			return new Guest( $p );
		}, $group_guests );
		return $group;
	}

	/**
	 * Sets up the grouped guests.
	 *
	 * @param array  $result_set Result set.
	 * @param string $class      A class to wrap the posts in.
	 *
	 * @return Repository
	 */
	protected function result_set( $result_set = [], $class = null ) {
		$mapped_guests    = array_map( array( $this, 'map_group_guests' ), $result_set );
		$this->result_set = array_filter( $mapped_guests );
		return $this;
	}
}
