(function($) {
  // eslint-disable-next-line no-undef
  $(document).ready(function() {
    $('.js-add-new-event').on('click', function() {
      $(this).closest('#view-event-list').addClass('adding-new-event');
    });
    $('.js-cancel-add-new-event').on('click', function() {
      $(this).closest('#view-event-list').removeClass('adding-new-event');
    });
  });
})(jQuery); // eslint-disable-line

