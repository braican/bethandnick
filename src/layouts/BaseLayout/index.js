import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { decodeHtmlEntities } from '../../util/strings';

import InfoBox from '../../components/InfoBox';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BaseLayout = ({ children, location, featuredImage }) => (
  <StaticQuery
    query={graphql`
      {
        wordpressSiteMetadata {
          name
        }
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => {
      const siteName = decodeHtmlEntities(data.wordpressSiteMetadata.name);
      const { wedding_date, venue_name } = data.wordpressBethandnickInfo;
      return (
        <div className={`main page--${location || 'base'}`}>
          <Helmet
            title={siteName}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' }
            ]}
          >
            <html lang="en" />
          </Helmet>

          <div className="splitpane__img">
            {featuredImage ? <img src={featuredImage} alt="" /> : null}
          </div>

          <div className="splitpane__content">
            <InfoBox weddingDate={wedding_date} venueName={venue_name} />
            <Nav weddingDate={wedding_date} venueName={venue_name} />
            <Header siteTitle={siteName} weddingDate={wedding_date} venueName={venue_name} />
            {children}
            <Footer />
          </div>
        </div>
      );
    }}
  />
);

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
  featuredImage: PropTypes.string
};

export default BaseLayout;
