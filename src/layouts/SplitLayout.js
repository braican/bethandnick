import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SplitLayout = ({ location, featuredImage, pageTitle, data, children }) => {
  const { wedding_date: weddingDate, venue_name: venueName } = data.wordpressBethandnickInfo;

  const title = location === 'home' ? null : pageTitle;
  const linkTitle = location === 'home' ? false : true;

  return (
    <Wrapper contextClass={`main page--${location || 'base'}`}>
      <div className="splitpane__img">
        {featuredImage ? (
          <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
        ) : null}
      </div>

      <div className="splitpane__content">
        <Header
          contextClass="header--main"
          weddingDate={weddingDate}
          venueName={venueName}
          linkTitle={linkTitle}
        />
        {title ? <h2 className="page-title">{title}</h2> : null}
        {children}
        <Footer />
      </div>
    </Wrapper>
  );
};

SplitLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
  featuredImage: PropTypes.object,
  pageTitle: PropTypes.string,

  // The following come from the static query below
  data: PropTypes.shape({
    wordpressSiteMetadata: PropTypes.shape({
      name: PropTypes.string,
    }),
    wordpressBethandnickInfo: PropTypes.shape({
      wedding_date: PropTypes.string,
      venue_name: PropTypes.string,
    }),
  }),
};

const SplitLayoutStatic = props => (
  <StaticQuery
    query={graphql`
      {
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => <SplitLayout data={data} {...props} />}
  />
);

export default SplitLayoutStatic;
