<?php

namespace BethAndNick;

class Site {

    /**
     * The unique instance of the Site class.
     * @var BethAndNick\Site
     */
    private static $instance;

    /**
     * Gets the instance of the class.
     * 
     * @return BethAndNick\Site
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Constructor is private in a singleton.
     */
    private function __construct() {
        $this->create_image_sizes();

        // rearrange and hide some Admin menu links
        add_filter('custom_menu_order', '__return_true');
        add_filter('menu_order', array($this, 'rearrange_admin_menu'));
        add_action('admin_menu', array($this, 'remove_admin_menu_links'));
    }


    /**
     * Set up image sizes.
     * 
     * @return void
     */
    private function create_image_sizes() {
        add_image_size('featured', 1200, 1200, false);
    }

    /**
     * Remove links/menus from the admin sidebar menu.
     * 
     * @return void
     */
    public function remove_admin_menu_links() {
        remove_menu_page('edit-comments.php');
        remove_menu_page('edit.php');
    }

    /**
     * Rearrange the `Media` menu item in the WordPress nav.
     * 
     * @return void
     */
    public function rearrange_admin_menu() {
        return array('index.php', 'upload.php');
    }
}