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

use NetlifyDeployer\SaveCounter;

/**
 * Class to handle Administrative settings within WordPress.
 */
class Admin {
	/**
	 * The unique instance of the Site class.
	 *
	 * @var NetlifyDeployer\Admin
	 */
	private static $instance;

	/**
	 * The slug for the menu page.
	 *
	 * @var string
	 */
	private $menu_page_slug = 'deployer-settings';

	/**
	 * The name of the settings section for webhooks.
	 *
	 * @var string
	 */
	public $option_name = 'deployer_settings';

	/**
	 * The settings
	 *
	 * @var array
	 */
	public $settings = array();

	/**
	 * The Save Counter.
	 *
	 * @var NetlifyDeployer\SaveCounter
	 */
	private $save_counter;

	/**
	 * Gets the instance of this class.
	 *
	 * @return NetlifyDeployer\Admin
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * This is private.
	 */
	private function __construct() {
		$this->save_counter = SaveCounter::get_instance();

		if ( ! defined( 'DOING_AJAX' ) || ! DOING_AJAX ) {
			// Set up the data from the options table.
			$this->settings = wp_parse_args(
				get_option( $this->option_name ),
				array(
					'netlify_site_id'        => '',
					'netlify_deploy_admin'   => '',
					'build_hook_url'         => '',
					'build_hook_url_staging' => '',
				)
			);

			$this->trigger_hooks();
		}
	}


	/**
	 * Trigger admin hooks to create an admin page and settings.
	 *
	 * @return void
	 */
	private function trigger_hooks() {
		// Enqueue.
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );

		// Build the options page.
		add_action( 'admin_menu', array( $this, 'setup_menu_page' ) );
		add_action( 'admin_init', array( $this, 'setup_menu_settings' ) );
	}


	/**
	 * Add stylesheets to the admin.
	 *
	 * @return void
	 */
	public function admin_styles() {
		wp_enqueue_style( 'netlify-deployer-admin-styles', NETLIFY_DEPLOYER_DIRECTORY_URI . 'static/build/admin.css' );
	}


	/**
	 * Add scripts to the admin.
	 *
	 * @return void
	 */
	public function admin_scripts() {
		wp_enqueue_script( 'netlify-deployer-admin-scripts', NETLIFY_DEPLOYER_DIRECTORY_URI . 'static/build/deployer.js', array( 'jquery' ), '1.0' );
	}


	/**
	 * Sets up a menu page for the deploy settings.
	 *
	 * @return void
	 */
	public function setup_menu_page() {
		add_menu_page(
			'Netlify Deployer Settings',
			'Deployer',
			'manage_options',
			$this->menu_page_slug,
			array( $this, 'menu_page_markup' )
		);
	}


	/**
	 * Create settings sections and fields to add to our menu page.
	 *
	 * @return void
	 */
	public function setup_menu_settings() {
		register_setting(
			$this->option_name,
			$this->option_name,
			array(
				'sanitize_callback' => array( $this, 'validate_settings' ),
			)
		);

		add_settings_section(
			$this->option_name,
			'Webhooks',
			function() {
				echo '<p>Use the following fields to add build hooks from Netlify that can be used to trigger a deployment to the respective environments.</p>';
			},
			$this->menu_page_slug
		);

		add_settings_field(
			'build_hook_url',
			'Build Hook',
			array( $this, 'build_hook_url_markup' ),
			$this->menu_page_slug,
			$this->option_name,
			array(
				'key'          => 'build_hook_url',
				'status_badge' => true,
				'count_saves'  => true,
			)
		);

		add_settings_field(
			'build_hook_url_staging',
			'Build Hook - Staging',
			array( $this, 'build_hook_url_markup' ),
			$this->menu_page_slug,
			$this->option_name,
			array(
				'key'         => 'build_hook_url_staging',
				'button_text' => 'Deploy to Staging',
				'helper_text' => 'This deploys to the staging site at https://develop--indigo-technology.netlify.com/',
			)
		);

		/**
		 * Netlify group.
		 */

		add_settings_section(
			$this->option_name,
			'Netlify Settings',
			function() {
				echo '';
			},
			$this->menu_page_slug
		);

		add_settings_field(
			'netlify_site_id',
			'Site ID',
			array( $this, 'deployer_basic_text_field' ),
			$this->menu_page_slug,
			$this->option_name,
			array(
				'key'       => 'netlify_site_id',
				'help_text' => 'This can be found in your Netlify project by going to the Settings > General page and finding the "API ID" value in the Site Information.',
			)
		);

		add_settings_field(
			'netlify_deploy_admin',
			'Netlify Deployment Admin Link',
			array( $this, 'deployer_basic_text_field' ),
			$this->menu_page_slug,
			$this->option_name,
			array(
				'key'       => 'netlify_deploy_admin',
				'help_text' => 'This should be set to the link to the "Deploys" page in your Netlify project.',
			)
		);
	}



	// -------------------------------------------------
	//
	// Markup
	//
	// -------------------------------------------------

	/**
	 * Creates the markup for the admin page.
	 *
	 * @return void
	 */
	public function menu_page_markup() {
		?>
		<div class="wrap">
			<h1 class="wp-heading-inline">Netlify Deployer</h1>
			<p>Deployments to Netlify made simple.</p>
			<form action="options.php" method="post" class="netlify-deployer">
			<?php
				settings_errors();
				settings_fields( $this->option_name );
				do_settings_sections( $this->menu_page_slug );
				submit_button( 'Save' );
			?>
			</form>
		</div>
		<?php
	}


	/**
	 * Creates the markup for a simple text field.
	 *
	 * @param array $args Object containing some optional arguments for the text field.
	 * @arg string $key
	 * @arg string $help_text
	 *
	 * @return void
	 */
	public function deployer_basic_text_field( $args ) {
		$args = wp_parse_args(
			$args,
			array(
				'key'       => '',
				'help_text' => '',
			)
		);

		$options   = $this->settings;
		$value     = $options[ $args['key'] ] ?? '';
		$help_text = $args['help_text'] ? '<p class="description">' . $args['help_text'] . '</p>' : '';

		echo sprintf(
			'<input type="text" class="regular-text" name="%1$s[%2$s]" id="%2$s" value="%3$s">%4$s',
			$this->option_name,
			$args['key'],
			$value,
			$help_text
		);
	}

	/**
	 * Creates the markup for the `build_hook_url` field.
	 *
	 * @param array $args Object containing some optional arguments for the text field.
	 * @arg string  $key
	 * @arg boolean $status_badge
	 * @arg boolean $count_saves
	 *
	 * @return void
	 */
	public function build_hook_url_markup( $args ) {
		$args = wp_parse_args(
			$args,
			array(
				'key'          => '',
				'button_text'  => 'Deploy',
				'status_badge' => false,
				'count_saves'  => false,
				'helper_text'  => '',
			)
		);

		$value                     = $this->settings[ $args['key'] ] ?? '';
		$deploy_button             = $value ? '<button class="js-deployer deployer">' . $args['button_text'] . '</button><span class="netlify-deployer-loader"></span>' : '';
		$undeployed_change_display = $args['count_saves'] ? $this->save_counter->get_undeployed_change_display() : '';
		$helper_text               = $args['helper_text'] ? '<p class="description">' . $args['helper_text'] . '</p>' : '';
		$status_badge              = '';

		$input_field = sprintf(
			'<input type="url" class="regular-text js-deploy-hook-string" name="%1$s[%2$s]" id="%2$s" value="%3$s">',
			$this->option_name,
			$args['key'],
			$value
		);

		$deploy_actions = sprintf(
			'<div>%s%s%s</div>',
			$undeployed_change_display,
			$helper_text,
			$deploy_button
		);

		if ( $args['status_badge'] && $this->settings['netlify_site_id'] ) {
			$site_id              = $this->settings['netlify_site_id'];
			$deploy_admin_link    = $this->settings['netlify_deploy_admin'];
			$status_badge_img_src = "https://api.netlify.com/api/v1/badges/$site_id/deploy-status";

			$status_badge_img = sprintf( '<img src="%s">', $status_badge_img_src );

			if ( $deploy_admin_link ) {
				$status_badge_img = sprintf( '<a target="_blank" href="%s">%s</a>', $deploy_admin_link, $status_badge_img );
			}

			$status_badge = sprintf(
				'<div><p style="margin: 1em 0 .5em;">%s</p>%s</div>',
				'Current state of your latest production deploy:',
				$status_badge_img
			);
		}

		echo sprintf(
			'<div class="js-netlify-deployer-actions">%1$s%2$s%3$s</div>',
			$input_field,
			$deploy_actions,
			$status_badge
		);
	}


	// -------------------------------------------------
	//
	// Validators
	//
	// -------------------------------------------------

	/**
	 * Validate the settings fields.
	 *
	 * @param array $input The input values.
	 *
	 * @return array Filtered and sanitized input values.
	 */
	public function validate_settings( $input ) {
		if ( empty( $input ) ) {
			return $input;
		}

		$new_input = false;
		$options   = $this->settings;

		foreach ( $input as $key => $val ) {
			if ( 'build_hook_url' === $key && ! empty( $val ) && filter_var( $val, FILTER_VALIDATE_URL ) === false ) {
				add_settings_error( 'build_hook_url', 'invalid-url', 'You must supply a valid url.', 'error' );
				$new_input[ $key ] = $options['build_hook_url'];
			} elseif ( 'build_hook_url_staging' === $key && ! empty( $val ) && filter_var( $val, FILTER_VALIDATE_URL ) === false ) {
				add_settings_error( 'build_hook_url_staging', 'invalid-url', 'You must supply a valid url.', 'error' );
				$new_input[ $key ] = $options['build_hook_url_staging'];
			} else {
				$new_input[ $key ] = sanitize_text_field( $val );
			}
		}

		return $new_input;
	}
}
