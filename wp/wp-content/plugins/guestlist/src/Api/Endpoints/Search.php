<?php
/**
 * The search endpoint.
 *
 * @package Guestlist
 */

namespace Guestlist\Api\Endpoints;

use Guestlist\Models\GuestGroup;
use Guestlist\Repositories\GuestRepo;

/** Class */
class Search {
	/**
	 * Add the endpoint.
	 *
	 * @param string $route The path to the endpoint.
	 *
	 * @return void
	 */
	public function __construct( $route ) {
		register_rest_route(
			\Guestlist\Api\Api::NAMESPACE,
			$route,
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_content' ),
				'args'     => array(
					'event'  => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return is_numeric( $param );
						},
					),
					's_addr' => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return strlen( $param ) > 3;
						},
					),
				),
			)
		);
	}


	/**
	 * The function that will return the content for the endpoint.
	 *
	 * @param \WP_REST_Request $request Data in the request.
	 *
	 * @return array|WP_Error if there's an error.
	 */
	public function get_content( \WP_REST_Request $request ) {
		$event_id = $request->get_param( 'event' );
		$search   = $request->get_param( 's_addr' );

		return $this->search( $event_id, $search );
	}

	/**
	 * Search for guests with the given address in the given event.
	 *
	 * @param int    $event_id Post ID of the event to search in.
	 * @param string $search   String to search for.
	 *
	 * @return array|WP_Error if there's an error.
	 */
	private function search( $event_id, $search ) {
		$repo         = new GuestRepo( $event_id );
		$guest_groups = $repo->all();

		if ( ! $guest_groups->have_posts() ) {
			return new \WP_Error( 'no_guests', 'No guests were found for this event.', array( 'status' => 404 ) );
		}

		$records = [];

		foreach ( $guest_groups->get() as $group ) {
			$record = array(
				'objectID' => $group->ID,
				'street'   => $group->meta( 'street' ),
				'address'  => $group->meta( 'address' ),
			);

			$records[] = $record;
		}

		$fuse = new \Fuse\Fuse(
			$records,
			array(
				'keys'         => array( 'street', 'address' ),
				'threshold'    => 0.4,
				'includeScore' => true,
			)
		);

		$results = $fuse->search( $search );

		if ( empty( $results ) ) {
			return new \WP_Error( 'no_results', 'No results match that search.', array( 'status' => 404 ) );
		}

		return $results;
	}
}
