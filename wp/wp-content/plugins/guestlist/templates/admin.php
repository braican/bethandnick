<?php
/**
 * Admin template.
 *
 * @package Guestlist
 */

namespace Guestlist;

?>

<div class="wrap">
	<h1 class="wp-heading-inline">Guestlist</h1>

	<div class="gl-new-guest">
		<h2>Add new</h2>
		<form>
			<div class="gl-group">
				<label for="gl-guest-group-name">Group Name</label>
				<input id="gl-guest-group-name" type="text" placeholder="Goup name">
			</div>

			<div class="gl-guest-input">
				<label for="gl-guest">Guest</label>
				<input id="gl-guest" type="text" placeholder="Guest">
			</div>

			<button type="button" class="js-add-new-guest button">Add new guest</button>
		</form>
	</div>
</div>
