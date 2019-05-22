<?php
/**
 * Theme customizations.
 *
 * @package BethAndNick
 */

namespace BethAndNick;

/**
 * Set up hooks and setups for the theme.
 */
class Site {
	/**
	 * The unique instance of the Site class.
	 *
	 * @var BethAndNick\Site
	 */
	private static $instance;

	/**
	 * Gets the instance of the class.
	 *
	 * @return BethAndNick\Site
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor is private in a singleton.
	 */
	private function __construct() {
		$this->create_image_sizes();
		$this->add_options_pages();

		// Post types.
		add_action( 'init', array( $this, 'register_post_types' ) );

		// rearrange and hide some Admin menu links.
		add_filter( 'custom_menu_order', '__return_true' );
		add_filter( 'menu_order', array( $this, 'rearrange_admin_menu' ) );
		add_action( 'admin_menu', array( $this, 'remove_admin_menu_links' ) );
	}


	/**
	 * Set up image sizes.
	 *
	 * @return void
	 */
	private function create_image_sizes() {
		add_image_size( 'featured', 1200, 1200, false );
	}

	/**
	 * Adds options pages to the admin.
	 *
	 * @return void
	 */
	private function add_options_pages() {
		if ( ! function_exists( 'acf_add_options_page' ) ) {
			return;
		}

		acf_add_options_page(
			array(
				'page_title' => 'Global Content',
				'position'   => '5.1',
				'icon_url'   => 'dashicons-admin-customizer',
			)
		);

		acf_add_options_page(
			array(
				'page_title' => 'Image Gallery',
				'position'   => '20.1',
				'icon_url'   => 'dashicons-images-alt2',
			)
		);
	}

	/**
	 * Add post types.
	 *
	 * @return void
	 */
	public function register_post_types() {
		/**
		 * Wedding party
		 */
		$wedding_party_labels = array(
			'name'          => __( 'Wedding Party' ),
			'singular_name' => __( 'Wedding Party Member' ),
			'add_new_item'  => __( 'Add New Member' ),
		);

		register_post_type(
			'wedding_party',
			array(
				'labels'        => $wedding_party_labels,
				'public'        => false,
				'has_archive'   => false,
				'show_ui'       => true,
				'show_in_rest'  => true,
				'menu_position' => 22,
				'menu_icon'     => 'dashicons-admin-users',
				'supports'      => array( 'title' ),
			)
		);
	}

	/**
	 * Remove links/menus from the admin sidebar menu.
	 *
	 * @return void
	 */
	public function remove_admin_menu_links() {
		remove_menu_page( 'edit-comments.php' );
		remove_menu_page( 'edit.php' );
	}

	/**
	 * Rearrange the `Media` menu item in the WordPress nav.
	 *
	 * @return array
	 */
	public function rearrange_admin_menu() {
		return array( 'index.php', 'upload.php' );
	}
}
