<?php
/**
 * Set up the API.
 *
 * @package BethAndNick
 */

namespace BethAndNick;

/**
 * API class.
 */
class API {
	/**
	 * The unique instance of the API class.
	 *
	 * @var BethAndNick\API
	 */
	private static $instance;

	/**
	 * Gets the instance of the class.
	 *
	 * @return BethAndNick\API
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
		// Create some custom endpoints.
		add_action( 'rest_api_init', array( $this, 'setup_endpoints' ) );

		// Nullify falsey values.
		add_filter( 'acf/format_value/type=image', array( $this, 'nullify_empty' ), 100, 3 );

		// Set up the right fields for wedding party members.
		add_action( 'rest_api_init', array( $this, 'add_wedding_party_data' ) );
	}


	/**
	 * If an ACF field is empty, make sure it returns null rather than a falsey value so that
	 *  GraphQL can parse it the right way.
	 *
	 * @param mixed $value The value loaded from the database.
	 *
	 * @return mixed Null if the field is false or undefined, the value otherwise.
	 */
	public function nullify_empty( $value ) {
		if ( empty( $value ) ) {
			return null;
		}

		return $value;
	}

	/**
	 * Register the custom endpoints.
	 *
	 * @return void
	 */
	public function setup_endpoints() {
		$globals = new \BethAndNick\Endpoint\Globals();
		$globals = new \BethAndNick\Endpoint\Gallery();
	}


	/**
	 * Modifies the returned wedding party data.
	 *
	 * @return void
	 */
	public function add_wedding_party_data() {
		register_rest_field(
			'page',
			'wedding_party',
			array(
				'get_callback' => function( $object ) {
					if ( 'template-team.php' !== $object['template'] ) {
						return null;
					}
					$the_girls = get_field( 'the_girls', $object['id'] );
					$the_guys = get_field( 'the_guys', $object['id'] );
					$the_family = get_field( 'the_family', $object['id'] );
					$the_officiant = get_field( 'the_officiant', $object['id'] );

					return array(
						'the_girls'     => $the_girls ? array_map( array( $this, 'format_wedding_party' ), $the_girls ) : null,
						'the_guys'      => $the_guys ? array_map( array( $this, 'format_wedding_party' ), $the_guys ) : null,
						'the_family'    => $the_family ? array_map( array( $this, 'format_wedding_party' ), $the_family ) : null,
						'the_officiant' => $the_officiant ? array_map( array( $this, 'format_wedding_party' ), $the_officiant ) : null,
					);
				},
			)
		);

	}

	/**
	 * Format the wedding party object.
	 *
	 * @param int $id Post ID.
	 *
	 * @return array
	 */
	public function format_wedding_party( $id ) {
		$pics = get_field( 'person_pictures', $id );
		return array(
			'name'     => get_the_title( $id ),
			'role'     => get_field( 'wedding_role', $id ),
			'pictures' => $pics ? $pics : [],
		);
	}
}
