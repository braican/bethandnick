<?php
/**
 * Netlify Deployer
 *
 * @package   NetlifyDeployer
 * @author    Upstatement
 * @license   MIT License
 * @link      https://www.upstatement.com
 * @copyright 2019 Upstatement
 */

namespace NetlifyDeployer;

/**
 * Increment counter on specific saves so that we know how many updates we're deploying.
 */
class SaveCounter {
	/**
	 * The unique instance of the Site class.
	 *
	 * @var NetlifyDeployer\SaveCounter
	 */
	private static $instance;

	/**
	 * The key we'll use to store the save counter in the options table.
	 *
	 * @var string
	 */
	private $counter_option = 'deployer_save_counter';

	/**
	 * List of whitelisted post types that increment the undeployed changes counter on save.
	 *
	 * @var array
	 */
	private $incrementable_types = array(
		'post',
		'page',
		'job',
	);

	/**
	 * List of whitelisted options page slugs that, when saved, increment the undeployed change
	 *  counter.
	 *
	 * @var array
	 */
	private $incrementable_options_pages = array(
		'acf-options-home-page',
		'acf-options-tech-page',
		'acf-options-about-page',
		'acf-options-careers-page',
	);


	/**
	 * Gets the instance of this class.
	 *
	 * @return NetlifyDeployer\SaveCounter
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Private constructor.
	 */
	private function __construct() {
		add_action( 'save_post', array( $this, 'increment_saves_on_posts' ) );
		add_action( 'acf/save_post', array( $this, 'increment_saves_on_options'), 20 );
	}

	/**
	 * When a page is saved, increment the number of saves since the last deploy.
	 *
	 * @param int $post_id WP post being saved.
	 *
	 * @return void
	 */
	public function increment_saves_on_posts( $post_id ) {
		$post_type = get_post_type( $post_id );

		// Don't increment post revisions, or if the post being saved shouldn't be counted towards the
		// number of revisions.
		if ( wp_is_post_revision( $post_id ) || ! $this->should_increment_saves( $post_type ) ) {
			return;
		}

		$this->increment();
	}

	/**
	 * When an options page is saved, increment the number of saves.
	 *
	 * @param int $post_id WP post being saved.
	 *
	 * @return void
	 */
	public function increment_saves_on_options( $post_id ) {
		$screen = get_current_screen();

		if ( 'options' !== $post_id || ! $this->should_increment_saves( $screen ) ) {
			return;
		}

		$this->increment();
	}


	/**
	 * Get the number of saves since the last deploy.
	 *
	 * @return int
	 */
	public function get_undeployed_change_count() {
		return get_option( $this->counter_option, 0 );
	}

	/**
	 * Returns the markup to display the number of undeployed changes.
	 *
	 * @return string
	 */
	public function get_undeployed_change_display() {
		$undeployed_changes = $this->get_undeployed_change_count();
		$save_label         = 1 == $undeployed_changes ? 'save' : 'saves';
		return $undeployed_changes > 0 ? "<p class='change-count'>$undeployed_changes $save_label since last deployment.</p>" : '';
	}

	/**
	 * Resets the changes counter to 0.
	 *
	 * @return void
	 */
	public function reset_changes_counter() {
		update_option( $this->counter_option, 0 );
	}


	/**
	 * Actually increment the counter.
	 *
	 * @return void
	 */
	private function increment() {
		$count     = get_option( $this->counter_option, 0 );
		$new_count = $count + 1;

		update_option( $this->counter_option, $new_count );
	}

	// -------------------------------------------------
	//
	// Util
	//
	// -------------------------------------------------

	/**
	 * Checks to see if a save should increment the undeployed changes, based on the passed
	 *  information.
	 *
	 * @param mixed $post_info Information about a post. This can be either a string representing
	 *                         the post type, or a WP_Screen object identifying the current admin
	 *                         screen being saved.
	 *
	 * @return boolean True if the post type should increment, false if not.
	 */
	private function should_increment_saves( $post_info ) {
		if ( gettype( $post_info ) === 'string' ) {
			return in_array( $post_info, $this->incrementable_types );
		}

		foreach ( $this->incrementable_options_pages as $options_page ) {
			if ( false !== strpos( $post_info->id, $options_page ) ) {
				return true;
			}
		}

		return false;
	}

}
