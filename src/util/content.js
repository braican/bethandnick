/**
 * A grouping of filters for the markup from WordPress.
 *
 * @param {string} content Markup from WordPress.
 *
 * @return string
 */
export const contentFilter = content => content
  // Season styling.
  .replace(/(((S|s)eason\s\d)\s(&#8211;)\s)/g, '<span class="overline">$2</span>');
