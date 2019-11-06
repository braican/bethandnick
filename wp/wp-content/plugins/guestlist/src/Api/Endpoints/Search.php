<?php
/**
 * The search endpoint.
 *
 * @package Guestlist
 */

namespace Guestlist\Api\Endpoints;

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
					'event' => array(
						'required'          => true,
						'validate_callback' => function ( $param, $request, $key ) {
							return is_numeric( $param );
						},
					),
					's_addr' => array(
						'required' => true,
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
	 * @return array
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
	 * @return array|WP_Error if there are any errors.
	 */
	private function search( $event_id, $search ) {
		global $gl_algolia;

		if ( null === $gl_algolia ) {
			return new \WP_Error(
				'no_algolia',
				'The Algolia search has not been set up.',
				array( 'status' => 403 )
			);
		}

		// @TODO: make this a setting in the db.
		$index = $gl_algolia->initIndex( 'BETHANDNICK' );
		$res   = $index->search(
			$search,
			array(
				'filters' => 'event:' . $event_id,
			)
		);

		return array(
			'search' => $res,
		);
	}
}
