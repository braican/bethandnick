/**
 * Gets markup for an individual other guest.
 *
 * @param {object} guest Guest response data.
 * @returns string
 */
const singleGuestRsvp = (guest) => {
  const meal = guest.meal || (guest.vegetarian ? 'vegetarian option' : '');
  const otherRestrictions = guest.restrictions
    ? ` and have noted the following: ${guest.restrictions}`
    : '';
  let restrictionText = '';

  if (guest.vegetarian && guest.glutenFree) {
    restrictionText = `We've also got them down as Vegetarian and Gluten Free${otherRestrictions}.`;
  } else if (guest.vegetarian) {
    restrictionText = `We've also got them down as Vegetarian${otherRestrictions}.`;
  } else if (guest.glutenFree) {
    restrictionText = `We've also got them down as Gluten Free${otherRestrictions}.`;
  } else if (guest.restrictions) {
    restrictionText = `We've also noted the following: ${guest.restrictions}.`;
  }

  const icon = guest.attending ? 'confirm' : 'decline';
  const attendingText = guest.attending
    ? `can attend${meal ? `, and will be having the ${meal} for dinner` : ''}.`
    : 'cannot attend.';

  return `
  <tr>
    <td style="padding: 10px;">
      <img src="https://api.bethandnick.us/img/guest-${icon}.png" width="22" height="22">
    </td>
    <td style="padding: 10px; font-size: 20px; line-height: 30px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333;" class="padding" bgcolor="#fff">
      <b>${guest.name}</b> ${attendingText} ${restrictionText || ''}
    </td>
  </tr>
`;
};

/**
 * Handle restriction text for active guests.
 *
 * @param {object} guest Guest response data
 * @returns string
 */
export const getActiveGuestRestrictions = (guest) => {
  const otherRestrictions = guest.restrictions
    ? ` and have noted the following: ${guest.restrictions}`
    : '';

  if (guest.vegetarian && guest.glutenFree) {
    return `We've also got you down as Vegetarian and Gluten Free${otherRestrictions}.`;
  }

  if (guest.vegetarian) {
    return `We've also got you down as Vegetarian${otherRestrictions}.`;
  }

  if (guest.glutenFree) {
    return `We've also got you down as Gluten Free${otherRestrictions}.`;
  }

  if (guest.restrictions) {
    return `We've also noted the following: ${guest.restrictions}.`;
  }

  return '';
};

/**
 * Get the markup for the list of other guests rsvp'd by the current guest.
 *
 * @param {array} guests A list of guest responses.
 * @returns string
 */
export const getOtherGuestMarkup = (guests) => `
<tr>
  <td>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="left" style="font-size: 22px; font-weight: bold; font-family: Roboto, Helvetica, Arial, sans-serif; color: #333333; background-color: #fff; " class="padding" bgcolor="#fff">You've also rsvp'd for the following people:</td>
      </tr>
      <tr>
        <td height="10">&nbsp;</td>
      </tr>
      <tr>
        <td style="background-color: #fff;">
          <table>
            ${guests.map(singleGuestRsvp)}
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
  <td height="40"></td>
</tr>
`;
