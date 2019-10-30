<?php
/**
 * The Guest Group model.
 *
 * @package Guestlist
 */

namespace Guestlist\Models;

/** GuestGroup model */
class GuestGroup {
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
				'public'   => true,
				'supports' => array( 'title' ),
			)
		);
	}
}
