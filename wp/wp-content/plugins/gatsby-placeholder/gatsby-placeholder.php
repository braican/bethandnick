<?php
/*
	Plugin Name: Gatsby Placeholder
	Description: Creates a status to allow for placeholder content for Gatsby's GraphQL queries.
	Version: 0.1
	Author: Upstatement
	Author URI: http://www.upstatement.com/
*/

class GatsbyPlaceholder {
  /**
   * Static instance holder.
   *
   * @var GatsbyPlaceholder
   */
  private static $instance;

  /**
   * The key for the post status.
   *
   * @var string
   */
  public $status = 'gatsby_placeholder';

  /**
   * A list of admin users who can make placeholder decisions.
   *
   * @var array
   */
  private $auth_users = array('nick.braica@upstatement.com');

  /**
   * Private, since it's a singleton.
   */
	private function __construct() {
		/* Don't do anything, needs to be initialized via instance() method */
	}

  /**
   * Init.
   *
   * @return GatsbyPlaceholder
   */
	public static function instance() {
		if (! isset(self::$instance)) {
			self::$instance = new self();
			self::$instance->setup();
		}
		return self::$instance;
	}

	/**
	 * Register all actions and filters.
   *
   * @return void
	 */
	public function setup() {
    $current_user = wp_get_current_user();

    // Register the placeholder post status.
    add_action('init', array($this, 'register_post_status'));

    // Adds the meta field for this post status.
    add_action('init', array($this, 'register_meta_field'));

    // Excludes posts with the placeholder status from certain queries.
    add_action('pre_get_posts', array($this, 'exclude_placeholders'), 100);

    // Sets up the save hooks that will hijack the post status if the meta field is checked. The
    //  hook called for this is specific to each post type, so we lower the priority of this action
    //  so that it doesn't get called until all the custom post types have been loaded. That way,
    //  we can loop through each of the post types and set up the proper hook for each.
    add_action('init', array($this, 'setup_rest_hooks'), 100);

    // Only show the meta field control if the current user is privileged enough to make
    //  placeholder posts.
    if (in_array($current_user->user_email, $this->auth_users)) {
      add_action('enqueue_block_editor_assets', array($this, 'add_scripts'));
		}
  }

  /**
   * Add the Javascript.
   *
   * @return void
   */
  public function add_scripts() {
    wp_register_script(
      'gatsby-placeholder-script',
      plugins_url('js/gatsbyPlaceholder.js', __FILE__),
      array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-compose' )
    );

    wp_enqueue_script('gatsby-placeholder-script');
  }

	/**
	 * Register the custom post status.
	 *
	 * @return void
	 */
	public function register_post_status() {
		/**
		 * Filters the arguments passed to `register_post_status()`.
		 *
		 * @see register_post_status().
		 */
		register_post_status(
      $this->status,
      apply_filters(
        'gatsby_placeholder/post_status_args',
        array(
			    'label'                        => __('Placeholder', 'gatsby_placeholder'),
          'public'                    => true,
			    'exclude_from_search'          => true,
			    'show_in_admin_status_list'    => false,
			    'show_in_admin_all_list'       => false,
        )
      )
    );
  }

  /**
   * Register the meta field.
   *
   * @return void
   */
  public function register_meta_field() {
    register_meta('post', $this->status, array(
      'show_in_rest' => true,
      'single'       => true,
      'type'         => 'integer',
    ));
  }

  /**
   * Sets up hooks for each post type that will fire when content has been added or updated in the
   *  REST API. This allows us to check the status of the meta field and adjust the post status
   *  accordingly.
   *
   * @return void
   */
  public function setup_rest_hooks() {
    $public_types = get_post_types(
      array(
        'public' => true,
      )
    );

    foreach ($public_types as $t) {
      add_filter("rest_after_insert_${t}", array($this, 'rest_after_insert'));
    }
  }

  /**
	 * Set the custom post status when post data is being inserted. WordPress doesn't provide a great
	 *  way to manage custom post statuses. This method checks for the meta field we created to
   *  indicate a placeholder post, and then manually updates the `post_status`.
	 *
	 * @param array $post Post data
	 *
	 * @return void
	 */
  public function rest_after_insert($post) {
    $postStatus = get_post_status($post->ID);
    $isPlaceholder = get_post_meta($post->ID, $this->status, true);

    if ($postStatus === 'publish' && $isPlaceholder === '1') {
      wp_update_post(array('ID' => $post->ID, 'post_status' => $this->status));
    } else if ($this->status === $postStatus && $isPlaceholder !== '1') {
      wp_update_post(array('ID' => $post->ID, 'post_status' => 'publish'));
    }
  }


  /**
   * Excludes placeholder content in the admin.
   *
   * @return void
   */
  public function exclude_placeholders($query) {
    $public_types = get_post_types(
      array(
        'public' => true,
      )
    );

    $status = $query->get('post_status');
    $post_type = $query->get('post_type');

    if (is_admin() && $status === $this->status) {
      $query->set('post_status', $this->status);
    } else if (is_admin() && $query->is_main_query() && !$status) {
      $query->set('post_status', array('publish', 'future', 'draft', 'pending', 'private'));
    } else if (defined('REST_REQUEST') && REST_REQUEST && $post_type !== 'attachment' && in_array($post_type, $public_types)) {
      $query->set('post_status', array('publish', $this->status));
    }
  }
}

add_action('after_setup_theme', array( 'GatsbyPlaceholder', 'instance' ));
