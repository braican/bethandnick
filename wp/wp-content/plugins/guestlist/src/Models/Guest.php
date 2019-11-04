<?php
/**
 * The Guest model.
 *
 * @package Guestlist
 */

namespace Guestlist\Models;

use Guestlist\Models\Post;

/** Guest model */
class Guest extends Post {
	/**
	 * The typename.
	 *
	 * @var string
	 */
	const TYPE = 'gl_guest';


	/**
	 * Creates the custom post type.
	 */
	public static function create_type() {
		register_post_type(
			self::TYPE,
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

	/**
	 * Gets the attending status of this guest.
	 *
	 * @param boolean $raw Return the raw data, rather than the display word.
	 *
	 * @return string
	 */
	public function attending( $raw = false ) {
		$attending_status = $this->meta( 'gl_attending' );

		if ( $raw ) {
			return $attending_status;
		}

		if ( $attending_status > 0 ) {
			return 'Yes';
		} elseif ( $attending_status < 0 ) {
			return 'No';
		}

		return 'Not responded';
	}

	/**
	 * Gets the selected meal of this guest.
	 *
	 * @return string
	 */
	public function meal() {
		$meal = $this->meta( 'gl_meal' );

		if ( $meal ) {
			return $meal;
		}

		return 'Not selected';
	}

}
