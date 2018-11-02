import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { decodeHtmlEntities } from '../../util/strings';

import Header from '../../components/Header';

const BaseLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        wordpressSiteMetadata {
          name
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={decodeHtmlEntities(data.wordpressSiteMetadata.name)}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={decodeHtmlEntities(data.wordpressSiteMetadata.name)} />
        <div className="l-main">{children}</div>
      </>
    )}
  />
);

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default BaseLayout;
