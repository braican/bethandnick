export { isDesktop } from './responsive';
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

export const untrailingSlashIt = str => str.replace(/\/$/, '');
export const trailingSlashIt = str => `${untrailingSlashIt(str)  }/`;
