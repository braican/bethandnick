<?php
/**
 * The Guest Group model.
 *
 * @package Guestlist
 */

namespace Guestlist\Models;

use Guestlist\Models\Guest;

/** GuestGroup model */
class GuestGroup extends Post {
	/**
	 * The type name.
	 *
	 * @var string
	 */
	const TYPE = 'gl_group';

	/**
	 * Creates the custom post type.
	 */
	public static function create_type() {
		register_post_type(
			self::TYPE,
			array(
				'labels'   => array(
					'name'          => 'Groups',
					'singular_name' => 'Group',
					'add_new_item'  => 'Add new group',
					'not_found'     => 'No groups found',
				),
				'public'   => false,
				'show_ui'  => true,
				'supports' => array( 'title' ),
			)
		);
	}

	/**
	 * Gets the guests in a Guestlist.
	 *
	 * @return array
	 */
	public function get_guests() {
		$guests = $this->meta( 'gl_guests' );

		if ( ! $guests ) {
			return [];
		}

		return array_map( function ( $guest_id ) {
			return new Guest( $guest_id );
		}, $guests );
	}

	/**
	 * Gets the full address of this guest group.
	 *
	 * @return string
	 */
	public function get_address() {
		return $this->meta( 'address' );
	}

	/**
	 * Gets the street address of this guest group.
	 *
	 * @return string
	 */
	public function get_street() {
		return $this->meta( 'street' );
	}
}
