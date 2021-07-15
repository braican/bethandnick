<?php
/**
 * The search endpoint.
 *
 * @package Guestlist
 */

namespace Guestlist\Api\Endpoints;

use Guestlist\Models\GuestGroup;
use Guestlist\Repositories\GuestRepo;
use Guestlist\Admin\Store;

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

		$auth      = $request->get_header( 'Authorization' );
		$api_check = Store::get( 'gl_api_key' );

		if ( $auth !== $api_check ) {
			return new \WP_Error( 'auth_error', 'Authorization error. Your API keys don\'t match up.', array( 'status' => 401 ) );
		}

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
				'threshold'    => 0.1,
				'includeScore' => true,
			)
		);

		$results = $fuse->search( $search );

		if ( empty( $results ) ) {
			return new \WP_Error( 'no_results', 'No results match that search.', array( 'status' => 200 ) );
		}

		return array_map( function ( $result ) {
			$id          = $result['item']['objectID'];
			$guest_group = new GuestGroup( $id );
			$return = array(
				'id'      => $guest_group->ID,
				'address' => $guest_group->get_address(),
				'street'  => $guest_group->get_street(),
			);

			$guests = array();

			foreach ( $guest_group->get_guests() as $guest ) {
				$guest_data = array(
					'id'        => $guest->ID,
					'name'      => $guest->post_title,
					'attending' => $guest->attending( true ),
					'meal'      => $guest->meal( true ),
				);
				array_push( $guests, $guest_data );
			}

			$return['guests'] = $guests;

			return $return;
		}, $results );
	}
}
