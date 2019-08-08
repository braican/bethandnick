<?php
/**
 * Dealing with the Guest post type.
 *
 * @package guestlist
 */

namespace Guestlist;

/**
 * Class to handle interactions with the Guest content type.
 */
class GuestType {
	/**
	 * Creates the Guest type.
	 *
	 * @return void
	 */
	public static function create() {
		register_post_type(
			'gl_guest',
			array(
				'labels'   => array(
					'name'          => 'Guests',
					'singular_name' => 'Guest',
					'add_new_item'  => 'Add new guest',
					'not_found'     => 'No guests found',
				),
				'public'   => true,
				'supports' => array( 'title' ),
			)
		);
	}
}


