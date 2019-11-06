<?php
/**
 * The Event model.
 *
 * @package Guestlist
 */

namespace Guestlist\Models;

/** Event model */
class Event extends Post {
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
			self::TYPE,
			array(
				'labels'   => array(
					'name'          => 'Events',
					'singular_name' => 'Event',
					'add_new_item'  => 'Add new event',
					'not_found'     => 'No events found',
				),
				'public'   => true,
				'supports' => array( 'title' ),
			)
		);
	}
}
