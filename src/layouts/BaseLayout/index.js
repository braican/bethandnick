import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, Link } from 'gatsby';

import Header from '../../components/Header';

const BaseLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allWordpressPage(sort: { fields: [menu_order], order: ASC }) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        {data.allWordpressPage.edges.filter(({ node }) => node.slug !== 'home').map(({ node }) => (
          <Link key={node.id} to={`/${node.slug}`}>
            {node.title}
          </Link>
        ))}
        <div>{children}</div>
      </>
    )}
  />
);

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default BaseLayout;
