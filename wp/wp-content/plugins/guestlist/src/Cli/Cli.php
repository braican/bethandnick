<?php
/**
 * Sets up the CLI commands.
 *
 * @package Guestlist
 */

namespace Guestlist\Cli;

/** Class */
class Cli {
	/**
	 * The constructor to set up the CLI.
	 *
	 * @return void
	 */
	public function __construct() {
		$this->setup_commands();
	}

	/**
	 * Sets up CLI commands.
	 *
	 * @return void
	 */
	private function setup_commands() {
		if ( defined( '\WP_CLI' ) && \WP_CLI ) {
			\WP_CLI::add_command(
				'guestlist import',
				'Guestlist\Cli\ImportCommand'
			);
		}
	}
}
