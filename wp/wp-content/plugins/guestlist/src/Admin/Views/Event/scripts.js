/* eslint-disable no-var, prefer-template */

(function($) {

  function updateSubmitButton() {
    var guestCount = $('.new-guest-input').length;
    var submitButtonText = 'Add Guest';

    if (guestCount > 1) {
      submitButtonText += 's';
    }

    $('.js-add-guest-submit').text(submitButtonText);
  }

  // eslint-disable-next-line no-undef
  $(document).ready(function() {
    $('.js-add-new-guest').on('click', function() {
      $(this).closest('#view-event').addClass('adding-new-guest');
    });

    $('.js-cancel-add-new-guest').on('click', function() {
      $(this).closest('#view-event').removeClass('adding-new-guest');
    });

    $('.js-add-another-guest').on('click', function() {
      var $sourceInput = $('#gl-guest-name').parent();
      var $newInput = $sourceInput.clone();
      var $remove = $('<button class="button button-remove" type="button">X</button>').appendTo($newInput);

      $newInput.find('input').removeAttr('id').val('');
      $newInput.appendTo($sourceInput.parent());
      $newInput.find('input').focus();

      updateSubmitButton();

      $remove.on('click', function() {
        $(this).closest('.new-guest-input').remove();
        updateSubmitButton();
      });
    });
  });
})(jQuery); // eslint-disable-line

