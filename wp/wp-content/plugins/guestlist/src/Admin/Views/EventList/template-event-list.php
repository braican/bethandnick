<?php
/**
 * Admin template.
 *
 * @package Guestlist
 */

?>

<div class="wrap" id="view-event-list">
	<h1 class="wp-heading-inline">Guestlist</h1>

	<button class="page-title-action js-add-new-event">Add new event</button>

	<div class="gl-add-event-form">
		<form method="POST" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>">
			<div class="form-row">
				<label for="gl-new-event-name">Event name</label>
				<input type="text" id="gl-new-event-name" name="event_name" placeholder="Add event name">
			</div>

			<div class="form-row">
				<label for="gl-new-event-location">Location</label>
				<input type="text" id="gl-new-event-location" name="event_location" placeholder="Add event location">
			</div>

			<div class="form-row">
				<label for="gl-new-event-date">Event date</label>
				<input type="date" id="gl-new-event-date" name="event_date">
			</div>

			<input type="hidden" name="action" value="<?php echo esc_attr( $this->action ); ?>" />
			<button class="button button-primary button-large" type="submit">Add Event</button>&nbsp;&nbsp;
			<button class="button button-secondary js-cancel-add-new-event button-large" type="button">Cancel</button>
		</form>
	</div>

	<div class="gl-events-list">
		<?php if ( $this->have_events() ) : ?>
		<ul>
			<?php foreach ( $this->get_events() as $event ) : ?>
			<li>
				<h2><?php echo esc_html( get_the_title( $event->ID ) ); ?></h2>
				<p><?php echo esc_html( get_post_meta( $event->ID, 'event_location', true ) ); ?></p>
				<p><?php echo esc_html( get_post_meta( $event->ID, 'event_date', true ) ); ?></p>
				<p><a href="<?php echo esc_url( admin_url( 'admin.php?page=guestlist&event=' . $event->ID ) ); ?>">Guestlist</a></p>
			</li>
			<?php endforeach; ?>
		</ul>

		<?php else : ?>
		<p>No events have been added.</p>
		<?php endif; ?>
	</div>
</div>
