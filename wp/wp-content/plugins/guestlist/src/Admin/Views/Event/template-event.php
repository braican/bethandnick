<?php
/**
 * Render the list of guests for the given event.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Event;

use Guestlist\Admin\Notices;

$gl_event          = $this->get_event();
$gl_all_events_url = admin_url( 'admin.php?page=guestlist' );

?>

<div class="wrap" id="view-event">

<?php if ( $gl_event ) : ?>

	<header>
		<a href="<?php echo esc_html( $gl_all_events_url ); ?>">← All events</a><br>
		<h1 class="wp-heading-inline">The <?php echo get_the_title( $gl_event ); ?> guest list</h1>
		<button class="page-title-action js-add-new-guest">Add new guest(s)</button>
	</header>

	<?php Notices::get(); ?>

	<div class="gl-form gl-add-new-guest-form">
		<form method="POST" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>">
			<div class="form-row">
				<label for="gl-new-guest-name">Guest name</label>
				<input
					type="text"
					id="gl-new-guest-name"
					name="event_name"
					placeholder="Add guest's name"
				>
			</div>

			<input type="hidden" name="action" value="<?php echo esc_attr( $this->action ); ?>" />
			<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'add_guest' ) ); ?>">
			<button class="button button-primary button-large" type="submit">
				Add Guest
			</button>

			<?php // phpcs:ignore ?>
			<button class="button button-secondary js-cancel-add-new-guest button-large" type="button">
				Cancel
			</button>
		</form>
	</div>

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
			<a href="<?php echo esc_attr( $gl_all_events_url ); ?>">
				← Back to the list of events
			</a>
		</p>
	</header>
<?php endif; ?>

</div>
