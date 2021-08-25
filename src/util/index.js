export { isDesktop } from './responsive';
export { catchApiError } from './services';
export { contentFilter } from './content';
export { createAttendingEmail } from './emails/createAttendingEmail';
export { createDeclinedEmail } from './emails/createDeclinedEmail';
export { createAlertEmail } from './emails/createAlertEmail';

/**
 * Transform html entities.
 *
 * @param {string}  input  The string to filter.
 *
 * @return string
 */
export const decodeHtmlEntities = (input) => String(input).replace(/&amp;/, '&');

/**
 * React helper to aid in adding classes for css modules.
 *
 * @param  {...any} classes The classes to add to an element.
 *
 * @return object
 */
export const className = (...classes) => ({
  className: classes.filter((className) => typeof className === 'string').join(' '),
});

/**
 * Parse a full name to return just the first name.
 *
 * @param string name The person's name.
 *
 * @return string
 */
export const getFirstName = (name) => {
  const names = name.split(' ');

  if (names.length < 2) {
    return name;
  }

  names.pop();
  return names.join(' ');
};

export const untrailingSlashIt = (str) => str.replace(/\/$/, '');
export const trailingSlashIt = (str) => `${untrailingSlashIt(str)}/`;

/**
 * Checks to see if a user input indicates no restriction based on some whitelisted words.
 *
 * @param {string} input The restriction text the user added to the text field.
 *
 * @return boolean
 */
export const indicatesNoRestriction = (input) => {
  const noWords = ['none', 'nope', 'no', 'no restrictions', 'no restriction'];
  return noWords.indexOf(input) > -1;
};
