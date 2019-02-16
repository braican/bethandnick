import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HeroLayout = ({ location, featuredImage, pageTitle, data, children }) => {
  const { wedding_date: weddingDate, venue_name: venueName } = data.wordpressBethandnickInfo;

  const title = location === 'home' ? null : pageTitle;
  const linkTitle = location === 'home' ? false : true;

  return (
    <Wrapper contextClass={`main page--${location || 'base'}`}>
      <div className="herolayout__hero">
        <Header
          contextClass="header--main"
          weddingDate={weddingDate}
          venueName={venueName}
          linkTitle={linkTitle}
        />
        {featuredImage ? (
          <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
        ) : null}
      </div>

      <div className="herolayout__content">
        {title ? <h2 className="page-title">{title}</h2> : null}
        {children}
        <Footer />
      </div>
    </Wrapper>
  );
};

HeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
  featuredImage: PropTypes.object,
  pageTitle: PropTypes.string,

  // The following come from the static query below
  data: PropTypes.shape({
    wordpressBethandnickInfo: PropTypes.shape({
      wedding_date: PropTypes.string,
      venue_name: PropTypes.string,
    }),
  }),
};

const HeroLayoutStatic = props => (
  <StaticQuery
    query={graphql`
      {
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => <HeroLayout data={data} {...props} />}
  />
);

export default HeroLayoutStatic;
