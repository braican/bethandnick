<?php
/**
 * Updates a given user with their rsvp data.
 *
 * @package Guestlist
 */

namespace Guestlist\Api\Endpoints;

use Guestlist\Models\Guest;
use Guestlist\Admin\Store;

/** Class */
class Update {
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
				'methods'  => 'POST',
				'callback' => array( $this, 'handle_request' ),
			)
		);

		// @TODO: remove this - it's dev only.
		register_rest_route(
			\Guestlist\Api\Api::NAMESPACE,
			'/_delete',
			array(
				'methods'  => 'POST',
				'callback' => function() {
					$all_guests = get_posts(array(
						'posts_per_page' => -1,
						'post_type'      => Guest::TYPE,
					));

					if ( $all_guests ) {
						foreach ( $all_guests as $g ) {
							delete_post_meta( $g->ID, 'gl_attending' );
							delete_post_meta( $g->ID, 'gl_meal' );
							delete_post_meta( $g->ID, 'gl_dietary_notes' );
						}
					}
				},
			)
		);
	}

	/**
	 * Handle the POST request.
	 *
	 * @param \WP_REST_Request $request Data in the request.
	 *
	 * @return string|\WP_Error
	 */
	public function handle_request( \WP_REST_Request $request ) {
		$data      = $request->get_params();
		$auth      = $request->get_header( 'Authorization' );
		$api_check = Store::get( 'gl_api_key' );

		if ( $auth !== $api_check ) {
			return new \WP_Error( 'auth_error', 'Authorization error. Your API keys don\'t match up.', array( 'status' => 401 ) );
		}

		if ( ! isset( $data['rsvps'] ) ) {
			return new \WP_Error( 'invalid_data', 'The request data is invalid.', array( 'status' => 400 ) );
		}

		foreach ( $data['rsvps'] as $guest_rsvp ) {
			$guest_id      = $guest_rsvp['id'];
			$attending     = (int) $guest_rsvp['attending'];
			$meal          = $guest_rsvp['meal'];
			$dietary_notes = isset( $guest_rsvp['restrictions'] ) ? $guest_rsvp['restrictions'] : '';

			$guest = new Guest( $guest_id );

			$guest->set_attending( 1 === $attending );

			if ( $meal ) {
				$guest->set_meal( $meal );
			}

			if ( $dietary_notes ) {
				$guest->set_dietary_notes( $dietary_notes );
			}
		}

		return 'RSVPs have been updated.';
	}


}
