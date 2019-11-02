<?php
/**
 * Pagination partial.
 *
 * @package Guestlist
 */

$gl_current_page = $this->get_current_page();
$gl_page_count   = $this->get_page_count();
?>

<p>Page <?php echo esc_html( $gl_current_page ); ?> of <?php echo esc_html( $gl_page_count ); ?></p>

<?php if ( $gl_page_count > 1 ) : ?>

<ul>
	<li>
		<?php if ( 1 !== $gl_current_page ) : ?>
		<a href="<?php echo esc_attr( $this->get_paginated_link( false ) ); ?>">
		<?php endif; ?>
			First
		<?php if ( 1 !== $gl_current_page ) : ?>
		</a>
		<?php endif; ?>
	</li>

	<li>
		<?php if ( $gl_current_page - 1 > 0 ) : ?>
		<a href="<?php echo esc_attr( $this->get_paginated_link( $gl_current_page - 1 ) ); ?>">
		<?php endif; ?>
			Previous
		<?php if ( $gl_current_page - 1 > 1 ) : ?>
		</a>
		<?php endif; ?>
	</li>

	<?php for ( $gl_i = 1; $gl_i <= $gl_page_count; $gl_i++ ) : ?>
	<li>
		<?php if ( $gl_current_page !== $gl_i ) : ?>
		<a href="<?php echo esc_attr( $this->get_paginated_link( $gl_i ) ); ?>">
		<?php endif; ?>
			Page <?php echo esc_html( $gl_i ); ?>
		<?php if ( $gl_current_page !== $gl_i ) : ?>
		</a>
		<?php endif; ?>
	</li>
	<?php endfor; ?>

	<li>
		<?php if ( $gl_current_page + 1 <= $gl_page_count ) : ?>
		<a href="<?php echo esc_attr( $this->get_paginated_link( $gl_current_page + 1 ) ); ?>">
		<?php endif; ?>
			Next
		<?php if ( $gl_current_page + 1 <= $gl_page_count ) : ?>
		</a>
		<?php endif; ?>
	</li>
	<li>
		<?php if ( $gl_current_page !== $gl_page_count ) : ?>
		<a href="<?php echo esc_attr( $this->get_paginated_link( $gl_page_count ) ); ?>">
		<?php endif; ?>
			Last
		<?php if ( $gl_current_page !== $gl_page_count ) : ?>
		</a>
		<?php endif; ?>
	</li>
</ul>


<?php endif; ?>
