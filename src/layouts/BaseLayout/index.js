import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { decodeHtmlEntities } from '../../util/strings';

import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BaseLayout = ({ children, location, featuredImage, pageTitle }) => (
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
      const { wedding_date, venue_name } = data.wordpressBethandnickInfo;
      const title = location === 'home' ? null : pageTitle;
      return (
        <div className={`main page--${location || 'base'}`}>
          <Helmet
            title={decodeHtmlEntities(data.wordpressSiteMetadata.name)}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>

          <div className="splitpane__img">
            {featuredImage ? <img src={featuredImage} alt="" /> : null}
          </div>

          <div className="splitpane__content">
            <Nav weddingDate={wedding_date} venueName={venue_name} />
            <Header
              contextClass="header--main"
              pageTitle={title}
              weddingDate={wedding_date}
              venueName={venue_name}
            />
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
  featuredImage: PropTypes.string,
  pageTitle: PropTypes.string,
};

export default BaseLayout;
