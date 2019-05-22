/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

require('dotenv').config();

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const pageQuery = graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            title
            content
            slug
            template
          }
        }
      }
    }
  `);

  return pageQuery.then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // The default template.

    const allPages = result.data.allWordpressPage.edges;

    allPages.forEach(({ node }) => {
      const slug = node.slug === 'home' ? '/' : `/${node.slug}/`;
      let template = path.resolve('./src/templates/page.js');

      if (node.template === 'template-hero.php') {
        template = path.resolve('./src/templates/page-hero.js');
      } else if (node.template === 'template-team.php') {
        template = path.resolve('./src/templates/page-team.js');
      }

      createPage({
        path: slug,
        component: template,
        context: {
          slug: node.slug,
          title: node.title,
          content: node.content,
        },
      });
    });
  });
};


/**
 * Add optional fields to existing post types.
 */
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    wordpress__PAGEWedding_partyThe_guys: {
      pictures: {
        type: '[wordpress__PAGEWedding_partyThe_guysPictures]',
      },
    },
    wordpress__PAGEWedding_partyThe_guysPictures: {
      image: {
        type: 'wordpress__wp_media',
      },
    },
  });
};

