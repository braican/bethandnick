<?php
/**
 * Gets admin notices.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin;

/** Class */
class Notices {
	const KEY = 'gl_form_notice';

	/**
	 * Print out any admin notices, and then delete them.
	 *
	 * @return void
	 */
	public static function get() {
		$notices = get_option( self::KEY, array() );

		// Iterate through our notices to be displayed and print them.
		foreach ( $notices as $notice ) {
			$n = sprintf(
				'<div class="notice below-h2 notice-%1$s %2$s"><p>%3$s</p></div>',
				$notice['type'],
				$notice['dismissible'] ? 'is-dismissible' : '',
				$notice['message']
			);

			echo wp_kses_post( $n );
		}

		// Now we reset our options to prevent notices being displayed forever.
		if ( ! empty( $notices ) ) {
			delete_option( 'gl_form_notice', array() );
		}
	}


	/**
	 * Adds an admin notice.
	 *
	 * @param string  $message     The text on the notice.
	 * @param string  $type        Type of notice.
	 * @param boolean $dismissible Whether this notice can be dismissed.
	 *
	 * @return void
	 */
	public static function add( $message, $type = 'success', $dismissible = false ) {
		$notices = get_option( self::KEY, array() );

		$new_notice = array(
			'message'     => $message,
			'type'        => $type,
			'dismissible' => $dismissible,
		);

		array_push( $notices, $new_notice );

		update_option( self::KEY, $notices );
	}
}
