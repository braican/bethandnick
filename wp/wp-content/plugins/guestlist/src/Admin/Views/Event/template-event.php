<?php
/**
 * Render the list of guests for the given event.
 *
 * @package Guestlist
 */

$gl_event          = $this->get_event();
$gl_all_events_url = admin_url( 'admin.php?page=guestlist' );

?>

<div class="wrap" id="view-guest-list">

<?php if ( $gl_event ) : ?>
	<header>
		<a href="<?php echo esc_html( $gl_all_events_url ); ?>">← All events</a><br>
		<h1 class="wp-heading-inline">The <?php echo get_the_title( $gl_event ); ?> guest list</h1>
		<button class="page-title-action js-add-new-guest">Add new guest(s)</button>
	</header>

	<div class="gl-guest-list">
	<?php if ( $this->have_guests() ) : ?>
	<p>Guests have been added for this event.</p>
	<?php else : ?>
	<p>No guests have been added for this event.</p>
	<?php endif; ?>
	</div>

<?php else : ?>
	<header>
		<h1>Invalid Event!</h1>
		<p>
			<a href="<?php echo esc_html( $gl_all_events_url ); ?>">
				← Back to the list of events
			</a>
		</p>
	</header>
<?php endif; ?>

</div>
