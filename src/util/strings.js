/**
 * Transform html entities.
 *
 * @param {string}  input  The string to filter.
 *
 * @return string
 */
export function decodeHtmlEntities(input) {
  return String(input).replace(/&amp;/, '&');
}
