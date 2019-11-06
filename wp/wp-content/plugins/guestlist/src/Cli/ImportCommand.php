<?php
/**
 * Import guests from a csv file.
 *
 * @package Guestlist
 */

namespace Guestlist\Cli;

/** Class */
class ImportCommand {
	/**
	 * Imports content from a csv file export file.
	 *
	 * ## OPTIONS
	 *
	 * <import_file>
	 * : CSV file containing guests.
	 *
	 * ## EXAMPLES
	 *
	 *     wp guestlist import ./import-file.csv
	 *
	 * @param array $files List of files.
	 *
	 * @return int 0 for success
	 */
	public function __invoke( $files ) {
		\WP_CLI::log( 'Import function here.' );
		return 0;
	}
}
