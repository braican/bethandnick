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

/**
 * Core functionality for the plugin.
 */
class Guestlist {
	/**
	 * Setup
	 */
	public function __construct() {
	}
}

/**
 * Initialize
 */
add_action(
	'admin_init',
	function() {
		$guestlist = new Guestlist();
	}
);

add_action( 'init', 'Guestlist\GuestType::create' );
add_action( 'admin_menu', 'Guestlist\Admin::create' );
add_action( 'admin_enqueue_scripts', 'Guestlist\Admin::enqueue' );
