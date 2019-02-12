/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

require('dotenv').config();

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            title
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const pageTemplate = path.resolve('./src/templates/page.js');
    const allPages = result.data.allWordpressPage.edges;

    allPages.forEach(({ node }) => {
      const slug = node.slug === 'home' ? '/' : node.slug;
      createPage({
        path: `/${slug}/`,
        component: pageTemplate,
        context: {
          slug: node.slug,
          title: node.title,
          content: node.content,
        },
      });
    });
  });
};
