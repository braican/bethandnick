<?php
/**
 * Automatically loads the specified file.
 *
 * @package Guestlist
 */

namespace Guestlist;

/**
 * Automatically loads the specified file.
 *
 * Examines the fully qualified class name, separates it into components, then creates
 * a string that represents where the file is loaded on disk.
 */
spl_autoload_register(
	function ( $filename ) {
		// If the specified $class_name does not include our namespace, duck out.
		if ( false === strpos( $filename, __NAMESPACE__ ) ) {
			return;
		}

		// First, separate the components of the incoming file.
		$file_path = explode( '\\', $filename );

		/**
			* - The first index will always be WCATL since it's part of the plugin.
			* - All but the last index will be the path to the file.
		 */
		// Get the last index of the array. This is the class we're loading.
		if ( isset( $file_path[ count( $file_path ) - 1 ] ) ) {
			$class_file = $file_path[ count( $file_path ) - 1 ];
			// If the classname has an underscore replace it with a hyphen for the file name.
			$class_file = str_ireplace( '_', '-', $class_file );
			$class_file = "$class_file.php";
		}

		/**
		 * Find the fully qualified path to the class file by iterating through the $file_path
		 *  array. We ignore the first index since it's always the top-level package. The last
		 *  index is always the file so we append that at the end.
		 */
		$fully_qualified_path = trailingslashit( plugin_dir_path( __FILE__ ) ) . 'src/';

		$file_path_count = count( $file_path ) - 1;

		for ( $i = 1; $i < $file_path_count; $i++ ) {
			$dir                   = $file_path[ $i ];
			$fully_qualified_path .= trailingslashit( $dir );
		}

		$fully_qualified_path .= $class_file;

		// Now we include the file.
		if ( file_exists( $fully_qualified_path ) ) {
			include_once $fully_qualified_path;
		}
	}
);
