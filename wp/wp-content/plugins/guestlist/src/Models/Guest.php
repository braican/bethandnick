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
	 * @param boolean $raw Return the raw data, rather than the display word.
	 *
	 * @return string
	 */
	public function meal( $raw = false ) {
		$meal = $this->meta( 'gl_meal' );

		if ( $meal ) {
			return $meal;
		}

		if ( $raw ) {
			return null;
		}

		return 'Not selected';
	}

	/**
	 * Gets the dietary notes.
	 *
	 * @return string
	 */
	public function dietary_notes() {
		$notes = $this->meta( 'gl_dietary_notes' );
		return $notes;
	}


	/**
	 * Build and return the object that should be presented in the REST API.
	 *
	 * @return array
	 */
	public function api_return() {
		return array(
			'id'   => $this->ID,
			'name' => $this->post_title,
		);
	}


	/** ---------- Updaters ---------- */

	/**
	 * Updates the guest's attending status.
	 *
	 * @param boolean $is_attending Whether or not the guest is going to be attending.
	 *
	 * @return \Guestlist\Models\Guest
	 */
	public function set_attending( bool $is_attending ) {
		$attending_status = $is_attending ? 1 : -1;
		update_post_meta( $this->ID, 'gl_attending', $attending_status );
		return $this;
	}

	/**
	 * Updates the guest's meal choice.
	 *
	 * @param string $meal The meal the guest would like.
	 *
	 * @return \Guestlist\Models\Guest
	 */
	public function set_meal( string $meal ) {
		update_post_meta( $this->ID, 'gl_meal', $meal );
		return $this;
	}

	/**
	 * Updates the guest's dietary restrictions.
	 *
	 * @param string $notes Any notes about a dietary restriction.
	 *
	 * @return \Guestlist\Models\Guest
	 */
	public function set_dietary_notes( string $notes ) {
		update_post_meta( $this->ID, 'gl_dietary_notes', $notes );
		return $this;
	}

}
