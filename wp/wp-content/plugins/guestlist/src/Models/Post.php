<?php
/**
 * A generic post class wrapper.
 *
 * @package Guestlist
 */

namespace Guestlist\Models;

class Post {
	/**
	 * The WP_Post object.
	 *
	 * @var WP_Post
	 */
	private $post;

	/**
	 * The ID of the post.
	 *
	 * @var int
	 */
	public $ID;

	/**
	 * The title of the post, which is also the guest.
	 *
	 * @var string
	 */
	public $post_title;

	/**
	 * Constructor, to extend WP_Post.
	 *
	 * @param mixed $_post The post object or ID to get.
	 */
	public function __construct( $_post ) {
		$this->post       = get_post( $_post );
		$this->post_title = $this->post->post_title;
		$this->ID         = (int) $this->post->ID;
	}


	/**
	 * Outputs the title of the post if you do something like `<h1>{{post}}</h1>`.
	 *
	 * @return string
	 */
	public function __toString() {
		return $this->title();
	}


	/**
	 * Returns the processed title. This returns the title of the post after WP's filters have run.
	 * This is analogous to `the_title()` in standard WP template tags.
	 *
	 * @return string
	 */
	public function title() {
		return get_the_title( $this->post );
	}

	/**
	 * Gets metadata.
	 *
	 * @param string $key The meta field to get.
	 *
	 * @return mixed|null if the meta value doesn't exist.
	 */
	public function meta( $key ) {
		$value = get_post_meta( $this->ID, $key, true );

		if ( $value ) {
			return $value;
		}

		return null;
	}


	/**
	 * Update the post title.
	 *
	 * @param string $new_title The new title.
	 *
	 * @return int Post ID.
	 */
	public function update_title( string $new_title ) {
		$success = wp_update_post(
			array(
				'ID'         => $this->ID,
				'post_title' => $new_title,
			)
		);

		return $success;
	}
}

