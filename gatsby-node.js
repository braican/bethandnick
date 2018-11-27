/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
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
      result.data.allWordpressPage.edges.forEach(({ node }) => {
        const slug = node.slug === 'home' ? '/' : node.slug;

        createPage({
          path: slug,
          component: path.resolve('./src/templates/page.js'),
          context: {
            slug: node.slug,
            title: node.title,
            content: node.content
          }
        });
      });
      resolve();
    });
  });
};
