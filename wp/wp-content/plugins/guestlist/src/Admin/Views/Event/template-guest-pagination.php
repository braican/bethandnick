<?php
/**
 * Pagination partial.
 *
 * @package Guestlist
 */

$gl_current_page = $this->get_current_page();
$gl_page_count   = $this->get_page_count();
?>

<div class="tablenav">
	<div class="tablenav-pages">
		<span class="displaying-num">Page <?php echo esc_html( $gl_current_page ); ?></span>

		<?php if ( $gl_page_count > 1 ) : ?>
			<?php if ( 1 !== $gl_current_page ) : ?>
			<a class="button" href="<?php echo esc_attr( $this->get_paginated_link( false ) ); ?>">
			<?php else : ?>
			<span class="button disabled">
			<?php endif; ?>
			«
			<?php if ( 1 !== $gl_current_page ) : ?>
			</a>
			<?php else : ?>
			</span>
			<?php endif; ?>

			<?php if ( $gl_current_page - 1 > 0 ) : ?>
			<a class="button" href="<?php echo esc_attr( $this->get_paginated_link( $gl_current_page - 1 ) ); ?>">
			<?php else : ?>
			<span class="button disabled">
			<?php endif; ?>
			‹
			<?php if ( $gl_current_page - 1 > 0 ) : ?>
			</a>
			<?php else : ?>
			</span>
			<?php endif; ?>

			<span class="paging-input"><?php echo esc_html( $gl_current_page ); ?> of <?php echo esc_html( $gl_page_count ); ?></span>

			<?php if ( $gl_current_page + 1 <= $gl_page_count ) : ?>
			<a class="button" href="<?php echo esc_attr( $this->get_paginated_link( $gl_current_page + 1 ) ); ?>">
			<?php else : ?>
			<span class="button disabled">
			<?php endif; ?>
			›
			<?php if ( $gl_current_page + 1 <= $gl_page_count ) : ?>
			</a>
			<?php else : ?>
			</span>
			<?php endif; ?>

			<?php if ( $gl_current_page !== $gl_page_count ) : ?>
			<a class="button" href="<?php echo esc_attr( $this->get_paginated_link( $gl_page_count ) ); ?>">
			<?php else : ?>
			<span class="button disabled">
			<?php endif; ?>
			»
			<?php if ( $gl_current_page !== $gl_page_count ) : ?>
			</a>
			<?php else : ?>
			</span>
			<?php endif; ?>
		<?php endif; ?>
	</div>
</div>
