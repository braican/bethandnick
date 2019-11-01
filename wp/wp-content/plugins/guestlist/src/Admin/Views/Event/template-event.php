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
			<div class="form-row gl-guest-address-wrapper">
				<h3><label>Guest address</label></h3>

				<div class="address-fields">
					<div class="address-field address-field--street">
						<label for="new-guest-street">Street</label>
						<input
							type="text"
							id="new-guest-street"
							name="guest_street"
							placeholder="Enter street"
							required
						>
					</div>

					<div class="address-field address-field--city">
						<label for="new-guest-city">City</label>
						<input
							type="text"
							id="new-guest-city"
							name="guest_city"
							placeholder="Enter city"
							required
						>
					</div>

					<div class="address-field address-field--state">
						<label for="new-guest-state">State</label>
						<select id="new-guest-state" name="guest_state" required>
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
							<option value="AZ">Arizona</option>
							<option value="AR">Arkansas</option>
							<option value="CA">California</option>
							<option value="CO">Colorado</option>
							<option value="CT">Connecticut</option>
							<option value="DE">Delaware</option>
							<option value="DC">District Of Columbia</option>
							<option value="FL">Florida</option>
							<option value="GA">Georgia</option>
							<option value="HI">Hawaii</option>
							<option value="ID">Idaho</option>
							<option value="IL">Illinois</option>
							<option value="IN">Indiana</option>
							<option value="IA">Iowa</option>
							<option value="KS">Kansas</option>
							<option value="KY">Kentucky</option>
							<option value="LA">Louisiana</option>
							<option value="ME">Maine</option>
							<option value="MD">Maryland</option>
							<option value="MA">Massachusetts</option>
							<option value="MI">Michigan</option>
							<option value="MN">Minnesota</option>
							<option value="MS">Mississippi</option>
							<option value="MO">Missouri</option>
							<option value="MT">Montana</option>
							<option value="NE">Nebraska</option>
							<option value="NV">Nevada</option>
							<option value="NH">New Hampshire</option>
							<option value="NJ">New Jersey</option>
							<option value="NM">New Mexico</option>
							<option value="NY">New York</option>
							<option value="NC">North Carolina</option>
							<option value="ND">North Dakota</option>
							<option value="OH">Ohio</option>
							<option value="OK">Oklahoma</option>
							<option value="OR">Oregon</option>
							<option value="PA">Pennsylvania</option>
							<option value="RI">Rhode Island</option>
							<option value="SC">South Carolina</option>
							<option value="SD">South Dakota</option>
							<option value="TN">Tennessee</option>
							<option value="TX">Texas</option>
							<option value="UT">Utah</option>
							<option value="VT">Vermont</option>
							<option value="VA">Virginia</option>
							<option value="WA">Washington</option>
							<option value="WV">West Virginia</option>
							<option value="WI">Wisconsin</option>
							<option value="WY">Wyoming</option>
						</select>
					</div>

					<div class="address-field address-field--zip">
						<label for="new-guest-zip">Zip code</label>
						<input
							type="text"
							id="new-guest-zip"
							name="guest_zip"
							placeholder="Enter zip"
							pattern="[0-9]*"
							required
						>
					</div>
				</div>
			</div>
			<br>

			<div class="form-row">
				<h3><label for="gl-new-guest-name">Guests</label></h3>
				<div class="new-guest-input">
					<input
						type="text"
						id="gl-guest-name"
						name="guest_name[]"
						placeholder="Add guest's name"
					>
				</div>
			</div>

			<div class="form-row">
				<button class="button button-secondary js-add-another-guest" type="button">
					Add another guest
				</button>
			</div>

			<input type="hidden" name="action" value="<?php echo esc_attr( $this->action ); ?>" />
			<input
				type="hidden"
				name="nonce"
				value="<?php echo esc_attr( wp_create_nonce( 'add_guest' ) ); ?>"
			>

			<div class="form-actions">
				<button
					class="button button-primary button-large js-add-guest-submit"
					type="submit"
				>Add Guest</button>

				<?php // phpcs:ignore ?>
				<button class="button button-secondary js-cancel-add-new-guest button-large" type="button">
					Cancel
				</button>
			</div>
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
