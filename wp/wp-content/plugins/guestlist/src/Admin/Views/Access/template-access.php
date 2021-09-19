<?php
/**
 * API Access template.
 *
 * @package Guestlist
 */

$api_key = $this->get_api_key();
?>

<div class="wrap" id="view-api-access">
	<h1 class="wp-heading-inline">API Access</h1>

	<?php if ($api_key) : ?>
		<p><strong>API Key: </strong> <span><?php echo $api_key; ?></span></p>
	<?php else : ?>
		<p>In order to access the API, you'll need an API key.</p>
	<?php endif; ?>

	<form method="POST" action="<?php echo esc_url( admin_url( 'admin.php' ) ); ?>">
		<input type="hidden" name="action" value="<?php echo esc_attr( $this->action ); ?>" />
		<input
			type="hidden"
			name="nonce"
			value="<?php echo esc_attr( wp_create_nonce( 'generate_api_key' ) ); ?>"
		>
		<button type="submit" class="button button-primary button-large">Generate <?php echo $api_key ? 'new ' : ''; ?>API Key</button>
	</form>
</div>
