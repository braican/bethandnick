<?php
/**
 * Index the content to Algolia.
 *
 * @package Guestlist
 */

namespace Guestlist\Cli;

use Guestlist\Models\GuestGroup;

class IndexAlgoliaCommand {
	/**
	 * Indexes content.
	 *
	 * ## EXAMPLES
	 *
	 *     wp guestlist import ./import-file.csv
	 *
	 * @param array $args       List of args passed to the command.
	 * @param array $assoc_args List of associative args passed to the command.
	 *
	 * @return int 0 for success
	 */
	public function __invoke( $args, $assoc_args ) {
		global $gl_algolia;

		if ( null === $gl_algolia ) {
			\WP_CLI::error( 'Algolia was not instantiated. Please make sure the `ALGOLIA_API_KEY` constant is included in wp-config.php.' );
		}

		// @TODO: make this a setting in the db.
		$index = $gl_algolia->initIndex( 'BETHANDNICK' );
		$index->clearObjects()->wait();

		$assoc_args = wp_parse_args(
			$assoc_args,
			array(
				'verbose' => null,
			)
		);

		$paged = 1;
		$count = 0;

		do {
			$guest_groups = new \WP_Query(
				array(
					'posts_per_page' => 100,
					'paged'          => $paged,
					'post_type'      => GuestGroup::TYPE,
				)
			);

			if ( ! $guest_groups->have_posts() ) {
				break;
			}

			$records = [];

			foreach ( $guest_groups->posts as $post ) {
				if ( $assoc_args['verbose'] ) {
					\WP_CLI::line( 'Serializing [' . $post->post_title . ']' );
				}

				$group = new GuestGroup( $post );

				$record = array(
					'objectID' => implode( '#', array( $group->post_type, $group->ID ) ),
					'postID'   => $group->ID,
					'title'    => $group->post_title,
					'event'    => $group->meta( 'gl_guest_event' ),
					'address'  => $group->meta( 'address' ),
				);

				$records[] = $record;
				$count++;
			}

			if ( $assoc_args['verbose'] ) {
				\WP_CLI::line( 'Sending batch' );
			}

			$index->saveObjects( $records );

			$paged++;

		} while ( true );

		\WP_CLI::success( "$count posts indexed in Algolia" );

		return 0;
	}
}
