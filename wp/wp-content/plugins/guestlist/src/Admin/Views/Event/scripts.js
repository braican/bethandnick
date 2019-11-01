(function($) {
  // eslint-disable-next-line no-undef
  $(document).ready(function() {
    $('.js-add-new-guest').on('click', function() {
      $(this).closest('#view-event').addClass('adding-new-guest');
    });
    $('.js-cancel-add-new-guest').on('click', function() {
      $(this).closest('#view-event').removeClass('adding-new-guest');
    });
  });
})(jQuery); // eslint-disable-line

