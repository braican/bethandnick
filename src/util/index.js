export { isDesktop } from './responsive';
export { catchApiError } from './services';
export { contentFilter } from './content';

/**
 * Transform html entities.
 *
 * @param {string}  input  The string to filter.
 *
 * @return string
 */
export const decodeHtmlEntities = input => String(input).replace(/&amp;/, '&');

/**
 * React helper to aid in adding classes for css modules.
 *
 * @param  {...any} classes The classes to add to an element.
 *
 * @return object
 */
export const className = (...classes) => ({
  className: classes.filter(className => typeof className === 'string').join(' '),
});

/**
 * Parse a full name to return just the first name.
 *
 * @param string name The person's name.
 *
 * @return string
 */
export const getFirstName = name => {
  const names = name.split(' ');
  names.pop();
  return names.join(' ');
};

export const untrailingSlashIt = str => str.replace(/\/$/, '');
export const trailingSlashIt = str => `${untrailingSlashIt(str)  }/`;
