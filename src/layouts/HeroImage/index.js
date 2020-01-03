import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HeroLayout = ({ featuredImage, pageTitle, children }) => (
  <div className="amp-accent amp-accent--hero-layout">
    <Header hero />

    <div className="herolayout__wrapper">
      <div className="herolayout__hero">
        <Img fluid={featuredImage} objectFit="cover" />
      </div>
      <div className="herolayout__content">
        <div className="herolayout__block">
          {pageTitle && <h2 className="page-title">{pageTitle}</h2>}
          {children}
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

HeroLayout.propTypes = {
  featuredImage: PropTypes.object,
  pageTitle: PropTypes.string,
  children: PropTypes.node,
};

HeroLayout.defaultProps = {
  featuredImage: null,
  pageTitle: null,
  children: null,
};

export default HeroLayout;
