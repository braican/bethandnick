<?php
/**
 * Render the list of guests for the given event.
 *
 * @package Guestlist
 */

namespace Guestlist\Admin\Views\Event;

use Guestlist\Admin\Notices;
use Guestlist\Admin\Store;

$gl_event          = $this->get_event();
$gl_all_events_url = admin_url( 'admin.php?page=guestlist' );

$gl_saved_address = Store::get( 'new_guest_data', true );

$gl_default_group  = isset( $gl_saved_address['group_name'] ) ? $gl_saved_address['group_name'] : '';
$gl_default_street = isset( $gl_saved_address['street'] ) ? $gl_saved_address['street'] : '';
$gl_default_city   = isset( $gl_saved_address['city'] ) ? $gl_saved_address['city'] : '';
$gl_default_state  = isset( $gl_saved_address['state'] ) ? $gl_saved_address['state'] : '';
$gl_default_zip    = isset( $gl_saved_address['zip'] ) ? $gl_saved_address['zip'] : '';

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
			<div class="form-section">
				<h3><label for="gl-guest-group-name">Group name</label></h3>
				<p>
					This will be used for grouping and sorting purposes only and will generally be
					the last name of one of the guests.
				</p>
				<input
					type="text"
					id="gl-guest-group-name"
					name="guest_group_name"
					value="<?php echo esc_attr( $gl_default_group ); ?>"
					placeholder="Add a group name here"
					required
				>
			</div>

			<div class="form-section gl-guest-address-wrapper">
				<h3><label>Guest address</label></h3>

				<div class="address-fields">
					<div class="address-field address-field--street">
						<label for="new-guest-street">Street</label>
						<input
							type="text"
							id="new-guest-street"
							name="guest_street"
							value="<?php echo esc_attr( $gl_default_street ); ?>"
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
							value="<?php echo esc_attr( $gl_default_city ); ?>"
							placeholder="Enter city"
							required
						>
					</div>

					<div class="address-field address-field--state">
						<label for="new-guest-state">State</label>
						<select id="new-guest-state" name="guest_state" required>
							<?php // phpcs:disable ?>
							<option value="AL"<?php echo 'AL' === $gl_default_state ? ' selected' : ''; ?>>Alabama</option>
							<option value="AK"<?php echo 'AK' === $gl_default_state ? ' selected' : ''; ?>>Alaska</option>
							<option value="AZ"<?php echo 'AZ' === $gl_default_state ? ' selected' : ''; ?>>Arizona</option>
							<option value="AR"<?php echo 'AR' === $gl_default_state ? ' selected' : ''; ?>>Arkansas</option>
							<option value="CA"<?php echo 'CA' === $gl_default_state ? ' selected' : ''; ?>>California</option>
							<option value="CO"<?php echo 'CO' === $gl_default_state ? ' selected' : ''; ?>>Colorado</option>
							<option value="CT"<?php echo 'CT' === $gl_default_state ? ' selected' : ''; ?>>Connecticut</option>
							<option value="DE"<?php echo 'DE' === $gl_default_state ? ' selected' : ''; ?>>Delaware</option>
							<option value="DC"<?php echo 'DC' === $gl_default_state ? ' selected' : ''; ?>>District Of Columbia</option>
							<option value="FL"<?php echo 'FL' === $gl_default_state ? ' selected' : ''; ?>>Florida</option>
							<option value="GA"<?php echo 'GA' === $gl_default_state ? ' selected' : ''; ?>>Georgia</option>
							<option value="HI"<?php echo 'HI' === $gl_default_state ? ' selected' : ''; ?>>Hawaii</option>
							<option value="ID"<?php echo 'ID' === $gl_default_state ? ' selected' : ''; ?>>Idaho</option>
							<option value="IL"<?php echo 'IL' === $gl_default_state ? ' selected' : ''; ?>>Illinois</option>
							<option value="IN"<?php echo 'IN' === $gl_default_state ? ' selected' : ''; ?>>Indiana</option>
							<option value="IA"<?php echo 'IA' === $gl_default_state ? ' selected' : ''; ?>>Iowa</option>
							<option value="KS"<?php echo 'KS' === $gl_default_state ? ' selected' : ''; ?>>Kansas</option>
							<option value="KY"<?php echo 'KY' === $gl_default_state ? ' selected' : ''; ?>>Kentucky</option>
							<option value="LA"<?php echo 'LA' === $gl_default_state ? ' selected' : ''; ?>>Louisiana</option>
							<option value="ME"<?php echo 'ME' === $gl_default_state ? ' selected' : ''; ?>>Maine</option>
							<option value="MD"<?php echo 'MD' === $gl_default_state ? ' selected' : ''; ?>>Maryland</option>
							<option value="MA"<?php echo 'MA' === $gl_default_state ? ' selected' : ''; ?>>Massachusetts</option>
							<option value="MI"<?php echo 'MI' === $gl_default_state ? ' selected' : ''; ?>>Michigan</option>
							<option value="MN"<?php echo 'MN' === $gl_default_state ? ' selected' : ''; ?>>Minnesota</option>
							<option value="MS"<?php echo 'MS' === $gl_default_state ? ' selected' : ''; ?>>Mississippi</option>
							<option value="MO"<?php echo 'MO' === $gl_default_state ? ' selected' : ''; ?>>Missouri</option>
							<option value="MT"<?php echo 'MT' === $gl_default_state ? ' selected' : ''; ?>>Montana</option>
							<option value="NE"<?php echo 'NE' === $gl_default_state ? ' selected' : ''; ?>>Nebraska</option>
							<option value="NV"<?php echo 'NV' === $gl_default_state ? ' selected' : ''; ?>>Nevada</option>
							<option value="NH"<?php echo 'NH' === $gl_default_state ? ' selected' : ''; ?>>New Hampshire</option>
							<option value="NJ"<?php echo 'NJ' === $gl_default_state ? ' selected' : ''; ?>>New Jersey</option>
							<option value="NM"<?php echo 'NM' === $gl_default_state ? ' selected' : ''; ?>>New Mexico</option>
							<option value="NY"<?php echo 'NY' === $gl_default_state ? ' selected' : ''; ?>>New York</option>
							<option value="NC"<?php echo 'NC' === $gl_default_state ? ' selected' : ''; ?>>North Carolina</option>
							<option value="ND"<?php echo 'ND' === $gl_default_state ? ' selected' : ''; ?>>North Dakota</option>
							<option value="OH"<?php echo 'OH' === $gl_default_state ? ' selected' : ''; ?>>Ohio</option>
							<option value="OK"<?php echo 'OK' === $gl_default_state ? ' selected' : ''; ?>>Oklahoma</option>
							<option value="OR"<?php echo 'OR' === $gl_default_state ? ' selected' : ''; ?>>Oregon</option>
							<option value="PA"<?php echo 'PA' === $gl_default_state ? ' selected' : ''; ?>>Pennsylvania</option>
							<option value="RI"<?php echo 'RI' === $gl_default_state ? ' selected' : ''; ?>>Rhode Island</option>
							<option value="SC"<?php echo 'SC' === $gl_default_state ? ' selected' : ''; ?>>South Carolina</option>
							<option value="SD"<?php echo 'SD' === $gl_default_state ? ' selected' : ''; ?>>South Dakota</option>
							<option value="TN"<?php echo 'TN' === $gl_default_state ? ' selected' : ''; ?>>Tennessee</option>
							<option value="TX"<?php echo 'TX' === $gl_default_state ? ' selected' : ''; ?>>Texas</option>
							<option value="UT"<?php echo 'UT' === $gl_default_state ? ' selected' : ''; ?>>Utah</option>
							<option value="VT"<?php echo 'VT' === $gl_default_state ? ' selected' : ''; ?>>Vermont</option>
							<option value="VA"<?php echo 'VA' === $gl_default_state ? ' selected' : ''; ?>>Virginia</option>
							<option value="WA"<?php echo 'WA' === $gl_default_state ? ' selected' : ''; ?>>Washington</option>
							<option value="WV"<?php echo 'WV' === $gl_default_state ? ' selected' : ''; ?>>West Virginia</option>
							<option value="WI"<?php echo 'WI' === $gl_default_state ? ' selected' : ''; ?>>Wisconsin</option>
							<option value="WY"<?php echo 'WY' === $gl_default_state ? ' selected' : ''; ?>>Wyoming</option>
						</select>
					</div>
					<?php // phpcs:enable ?>

					<div class="address-field address-field--zip">
						<label for="new-guest-zip">Zip code</label>
						<input
							type="text"
							id="new-guest-zip"
							name="guest_zip"
							value="<?php echo esc_attr( $gl_default_zip ); ?>"
							placeholder="Enter zip"
							pattern="[0-9]*"
							required
						>
					</div>
				</div>
			</div>

			<div class="form-section">
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

			<input type="hidden" name="action" value="<?php echo esc_attr( self::ACTION_ADD ); ?>" />
			<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'add_guest' ) ); ?>">
			<input type="hidden" name="event" value="<?php echo esc_attr( $gl_event->ID ); ?>">

			<div class="form-actions">
				<button class="button button-primary button-large js-add-guest-submit" type="submit">Add Guest</button>
				<button class="button button-secondary js-cancel-add-new-guest button-large" type="button">Cancel</button>
			</div>
		</form>
	</div>

	<div class="gl-attending-info">

	</div>

	<div class="gl-guest-list">
	<?php if ( $this->have_guests() ) : ?>
		<table class="gl-guest-table">
			<thead>
				<tr>
					<td><strong>Name</strong></td>
					<td><strong>Attending</strong></td>
					<td><strong>Meal</strong></td>
					<td><strong>Notes</strong></td>
				</tr>
			</thead>

			<?php foreach ( $this->get_guests() as $grouped_guests ) : ?>
			<tbody>
				<tr>
					<td colspan="4" class="group-header"><?php echo esc_html( $grouped_guests->get_address() ); ?></td>
				</tr>

				<?php foreach ( $grouped_guests->get_guests() as $guest ) : ?>
				<tr>
					<td><?php echo get_the_title( $guest ); ?></td>
					<td data-value="<?php echo esc_attr( $guest->attending( true ) ); ?>">
						<div class="gl-guest-info">
							<span class="gl-guest-value js-guest-value"><?php echo esc_attr( $guest->attending() ); ?></span>
							<a href="#" class="js-guest-edit-cell">Update</a>
						</div>

						<form class="gl-edit-guest js-edit-guest-attending-form">
							<div class="gl-edit-guest-options">
								<label>
									<input name="guest_attending" value="1" type="radio">
									Yes
								</label>

								<label>
									<input name="guest_attending" value="-1" type="radio">
									No
								</label>
							</div>

							<input type="hidden" name="guest_id" value="<?php echo esc_attr( $guest->ID ); ?>">
							<input type="hidden" name="action" value="<?php echo esc_attr( self::ACTION_EDIT_ATTENDING ); ?>">
							<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'edit_guest_attending_' . $guest->ID ) ); ?>">
							<input type="hidden" name="ajax_url" value="<?php echo esc_attr( admin_url( 'admin-ajax.php' ) ); ?>">

							<button class="button button-primary">Save</button>
							<button class="button button-secondary js-cancel-edit-guest">Cancel</button>
						</form>
					</td>

					<td data-value="<?php echo esc_attr( $guest->meal() ); ?>">
						<div class="gl-guest-info">
							<span class="gl-guest-value js-guest-value"><?php echo esc_attr( $guest->meal() ); ?></span>
							<a href="#" class="js-guest-edit-cell">Update</a>
						</div>

						<form class="gl-edit-guest js-edit-guest-meal-form">
							<div class="gl-edit-guest-options">
								<label>
									<input name="guest_meal" value="Meat" type="radio">
									Meat
								</label>

								<label>
									<input name="guest_meal" value="Fish" type="radio">
									Fish
								</label>

								<label>
									<input name="guest_meal" value="Pasta" type="radio">
									Pasta
								</label>
							</div>

							<input type="hidden" name="guest_id" value="<?php echo esc_attr( $guest->ID ); ?>">
							<input type="hidden" name="action" value="<?php echo esc_attr( self::ACTION_EDIT_MEAL ); ?>">
							<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'edit_guest_meal_' . $guest->ID ) ); ?>">
							<input type="hidden" name="ajax_url" value="<?php echo esc_attr( admin_url( 'admin-ajax.php' ) ); ?>">

							<button class="button button-primary">Save</button>
							<button class="button button-secondary js-cancel-edit-guest">Cancel</button>
						</form>
					</td>
					<td data-value="<?php echo esc_attr( $guest->dietary_notes() ); ?>">
						<?php echo esc_attr( $guest->dietary_notes() ); ?>
					</td>
				</tr>
				<?php endforeach; ?>
			</tbody>
			<?php endforeach; ?>
			</tbody>
		</table>

		<?php include_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'template-guest-pagination.php'; ?>

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
