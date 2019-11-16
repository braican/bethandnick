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

    $('.js-cancel-edit-guest').on('click', function(event) {
      event.preventDefault();
      $(this)
        .closest('td').removeClass('gl-editing-cell')
        .find('input[type="radio"]:checked').prop('checked', false);
    });

    $('.js-guest-edit-cell').on('click', function(event) {
      event.preventDefault();
      var $cell = $(this).closest('td').addClass('gl-editing-cell');
      var val = $cell.data('value') + '';

      $cell.find('input[type="radio"]').each(function() {
        var rVal = $(this).attr('value') + '';
        $(this).prop('checked', rVal === val);
      });
    });


    $('.js-edit-guest-attending-form').on('submit', function(event) {
      event.preventDefault();
      var data = $(this).serializeArray().reduce(function(acc, curr) {
        acc[curr.name] = curr.value;
        return acc;
      }, {});

      var isAttending = data.guest_attending;

      $(this)
        .closest('td').removeClass('gl-editing-cell').data('value', isAttending)
        .find('.js-guest-value').text(isAttending > 0 ? 'Yes' : 'No');

      $.post(data.ajax_url, data);
    });


    $('.js-edit-guest-meal-form').on('submit', function(event) {
      event.preventDefault();
      var data = $(this).serializeArray().reduce(function(acc, curr) {
        acc[curr.name] = curr.value;
        return acc;
      }, {});

      var meal = data.guest_meal;

      $(this)
        .closest('td').removeClass('gl-editing-cell').data('value', meal)
        .find('.js-guest-value').text(meal);

      $.post(data.ajax_url, data);
    });
  });

})(jQuery); // eslint-disable-line

