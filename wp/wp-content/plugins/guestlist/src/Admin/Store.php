<?php
/**
 * A place for a global admin store.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin;

/** Class */
class Store {
	const KEY = 'gl_admin_store';

	/**
	 * Print out any admin notices, and then delete them.
	 *
	 * @param string  $key   The store key to get.
	 * @param boolean $clean Whether or not to delete the store data after it's been retrieved.
	 *
	 * @return mixed
	 */
	public static function get( $key, $clean = false ) {
		$store = get_option( self::KEY, array() );

		// Now we reset our options to prevent notices being displayed forever.
		if ( ! empty( $store ) && isset( $store[ $key ] ) && $store[ $key ] ) {
			$value = $store[ $key ];

			if ( $clean ) {
				$store[ $key ] = null;
				update_option( self::KEY, $store );
			}

			return $value;
		}
	}

	/**
	 * Adds an admin notice.
	 *
	 * @param string $key   Key for the value.
	 * @param mixed  $value Value to store.
	 *
	 * @return void
	 */
	public static function set( $key, $value ) {
		$store         = get_option( self::KEY, array() );
		$store[ $key ] = $value;
		update_option( self::KEY, $store );
	}
}
