<?php
/**
 * The Guest model.
 *
 * @package guestlist
 */

namespace Guestlist\Models;

/** Guest model */
class Guest {
	/**
	 * The typename.
	 *
	 * @var string
	 */
	const TYPE = 'gl_event';

	/**
	 * Creates the custom post type.
	 */
	public static function create_type() {
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
