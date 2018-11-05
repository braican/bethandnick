import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { decodeHtmlEntities } from '../../util/strings';

import Header from '../../components/Header';

const BaseLayout = ({ children, location, featuredImage }) => (
  <StaticQuery
    query={graphql`
      {
        wordpressSiteMetadata {
          name
        }
      }
    `}
    render={data => (
      <div className={`main page--${location || 'base'}`}>
        <Helmet
          title={decodeHtmlEntities(data.wordpressSiteMetadata.name)}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header
          siteTitle={decodeHtmlEntities(data.wordpressSiteMetadata.name)}
          featuredImage={featuredImage}
        />
        <div className="l-main">{children}</div>
      </div>
    )}
  />
);

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
  featuredImage: PropTypes.string
};

export default BaseLayout;
