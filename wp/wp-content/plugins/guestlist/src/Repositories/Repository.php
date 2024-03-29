<?php
/**
 * Parent repository class. Provides a very basic, fluent interface for interacting with
 * WP_Query class.
 *
 * @package Guestlist
 */

namespace Guestlist\Repositories;

/** Class */
class Repository {
	/**
	 * Results.
	 *
	 * @var array
	 */
	public $result_set = [];

	/**
	 * WordPress query object.
	 *
	 * @var WP_Query
	 */
	private $query;

	/**
	 * Init with an empty WP_Query.
	 */
	public function __construct() {
		$this->query = new \WP_Query();
	}

	/**
	 * Parse query params with sensible defaults.
	 *
	 * @param array $args Arguments to send to the query that will get merged with the defaults.
	 *
	 * @return array
	 */
	protected function get_params( array $args = [] ) {
		$defaults = array(
			'post_status'    => 'publish',
			'posts_per_page' => 10,
		);

		return wp_parse_args( $args, $defaults );
	}

	/**
	 * Returns a list or collection of posts.
	 *
	 * @return array
	 */
	public function get() {
		return $this->result_set;
	}

	/**
	 * Gets whether or not the result set has posts in it.
	 *
	 * @return boolean
	 */
	public function have_posts() {
		return $this->result_set && count( $this->result_set ) > 0;
	}

	/**
	 * Returns the first item in a collection. Returns null if there are 0 items in the collection.
	 *
	 * @return mixed
	 */
	public function first() {
		$local_array = $this->get();
		return isset( $local_array[0] ) ? $local_array[0] : null;
	}

	/**
	 * Runs a query.
	 *
	 * @param array  $params WP Query params.
	 * @param string $class  A class to wrap the posts in.
	 *
	 * @return Repository
	 */
	protected function query( array $params, string $class = null ) {
		// Clear old result sets.
		$this->reset();

		$cache_key    = __FUNCTION__ . md5( http_build_query( $params ) );
		$cached_posts = wp_cache_get( $cache_key, __CLASS__ );

		if ( false !== $cached_posts && count( $cached_posts ) > 0 ) {
			// Use cached results.
			return $this->result_set( $cached_posts );
		}

		$posts = $this->query->query( $params );

		// Cache our results.
		if ( count( $posts ) > 0 ) {
			wp_cache_set( $cache_key, $posts, __CLASS__ );
		}

		return $this->result_set( $posts, $class );
	}

	/**
	 * Clears the current result set.
	 *
	 * @return Repository
	 */
	protected function reset() {
		$this->result_set = [];
		return $this;
	}

	/**
	 * Returns current result set
	 *
	 * @param array  $result_set Result set.
	 * @param string $class      A class to wrap the posts in.
	 *
	 * @return Repository
	 */
	protected function result_set( $result_set = [], $class = null ) {
		if ( $class ) {
			$result_set = array_map( function( $thing ) use ( $class ) {
				return new $class( $thing );
			}, $result_set );
		}

		$this->result_set = $result_set;
		return $this;
	}


	/**
	 * Returns the number of pages the query has returned.
	 *
	 * @return int
	 */
	public function get_pages() {
		return $this->query->max_num_pages;
	}
}
