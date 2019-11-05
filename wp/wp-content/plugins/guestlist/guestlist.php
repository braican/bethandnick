<?php
/**
 * Guestlist
 *
 * @package   Guestlist
 * @author    Nick Braica
 * @license:  GPL
 * @link      https://www.braican.com
 * @copyright 2019 braican
 *
 * @wordpress-plugin
 * Plugin Name:       Guestlist
 * Description:       Inviting people to your event has never been easier to keep track of.
 * Version:           0.0.1
 * Author:            Nick Braica
 * Author URI:        https://www.braican.com
 * License:           GPL
 */

namespace Guestlist;

// If this file is called directly, get out.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'GUESTLIST_VERSION', '0.0.1' );
define( 'GUESTLIST_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GUESTLIST_URI', trailingslashit( plugin_dir_url( __FILE__ ) ) );

// Load the autoloader.
require_once GUESTLIST_PATH . 'autoloader.php';

use Guestlist\Admin\Admin;
use Guestlist\Cli\Cli;
use Guestlist\Api\Api;

/**
 * Core functionality for the plugin.
 */
class Guestlist {
	/**
	 * Admin.
	 *
	 * @var \Guestlist\Admin
	 */
	private $admin;

	/**
	 * CLI.
	 *
	 * @var \Guestlist\Cli
	 */
	private $cli;

	/**
	 * API.
	 *
	 * @var \Guestlist\Api
	 */
	private $api;


	/**
	 * Instntiated class.
	 *
	 * @var \Guestlist\Guestlist
	 */
	public static $init;

	/**
	 * Run actions.
	 *
	 * @return \Guestlist\Guestlist
	 */
	public static function init() {

		if ( null === self::$init ) {
			self::$init = new self();
			self::$init->run();
		}

		return self::$init;
	}

	/**
	 * Init classes and run the hooks.
	 *
	 * @return void
	 */
	public function run() {
		$this->admin = new Admin();
		$this->cli   = new Cli();
		$this->api   = new Api();

		$this->admin->hooks();
		$this->define_public_hooks();
	}

	/**
	 * Set up hooks to run on the front-end.
	 *
	 * @return void
	 */
	private function define_public_hooks() {
		add_action( 'init', array( $this, 'create_types' ) );
	}

	/**
	 * Creates the different content types.
	 *
	 * @return void
	 */
	public function create_types() {
		Models\Guest::create_type();
		Models\Event::create_type();
		Models\GuestGroup::create_type();
	}
}

$guestlist_min_php = '5.6.0';

// Check the minimum required PHP version and run the plugin.
if ( version_compare( PHP_VERSION, $guestlist_min_php, '>=' ) ) {
	/**
	 * Initialize
	 */
	Guestlist::init();
}
