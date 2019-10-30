<?php
/**
 * The events admin table.
 *
 * @package guestlist
 */

namespace Guestlist;

use Guestlist\Models\Event;

if ( ! class_exists( '\WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/** The events table, which extends teh WP_List_Table class. */
class EventsTable extends \WP_List_Table {
	/** Class constructor */
	public function __construct() {
		parent::__construct( [
			'singular' => __( 'Event', 'guestlist' ),
			'plural'   => __( 'Events', 'guestlist' ),
			'ajax'     => false,
		] );
	}

	/**
	 * Columns for the table.
	 *
	 * @return array
	 */
	public function get_columns() {
		$table_columns = array(
			'cb'         => '<input type="checkbox" />', // to display the checkbox.
			'event_name' => 'Event',
			'event_date' => 'Event date',
		);

		return $table_columns;
	}

	/**
	 * Prepares the items for the table.
	 *
	 * @return void
	 */
	public function prepare_items() {
		$events_per_page = $this->get_items_per_page( 'listings_per_page' );
		$table_page      = $this->get_pagenum();

		$events = new \WP_Query(
			array(
				'post_type'      => Event::TYPE,
				'posts_per_page' => $events_per_page,
			)
		);

		error_log(print_r($events_per_page, true));

		$this->items = $events->get_posts();
	}

	/**
	 * Render the column data.
	 *
	 * @return mixed
	 */
	public function column_default( $item, $column_name ) {
		return $item[ $column_name ];
	}

	/**
	 * Message for when there are no items in the table. This should echo the message.
	 *
	 * @return void
	 */
	public function no_items() {
		echo 'No events created.';
	}
}
