<?php
/**
 * Admin template.
 *
 * @package Guestlist
 */

?>

<div class="wrap">
	<h1 class="wp-heading-inline">Guestlist</h1>

	<a href="/wp-admin/post-new.php?post_type=gl_event" class="page-title-action">Add new event</a>

	<div class="gl-add-event-form">
		<form method="POST" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>">
			<input type="text" name="event_name" placeholder="Add event name">
			<input type="text" name="event_location" placeholder="Add event location">
			<input type="date" name="event_date">

			<input type="hidden" name="action" value="<?php echo esc_attr( $this->action ); ?>" />
			<button class="button button-primary button-large" type="submit">Add Event</button>
		</form>
	</div>

	<div class="gl-events-list">
		<?php if ( $this->have_events() ) : ?>
			<p>Has events</p>
		<?php else : ?>
			<p>No events have been added.</p>
		<?php endif; ?>
	</div>
</div>
