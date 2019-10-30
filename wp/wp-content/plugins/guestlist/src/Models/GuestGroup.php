<?php
/**
 * The Guest Group model.
 *
 * @package guestlist
 */

namespace Guestlist\Models;

/** GuestGroup model */
class GuestGroup {
	/**
	 * Creates the custom post type.
	 */
	public static function create_type() {
		register_post_type(
			'gl_group',
			array(
				'labels'   => array(
					'name'          => 'Groups',
					'singular_name' => 'Group',
					'add_new_item'  => 'Add new group',
					'not_found'     => 'No groups found',
				),
				'public'   => true,
				'supports' => array( 'title' ),
			)
		);
	}
}
