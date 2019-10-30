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

	<div class="gl-events-list">
		<form id="gl-events-list-form" method="get">
			<?php $this->events_table->display(); ?>
		</form>
	</div>
</div>
