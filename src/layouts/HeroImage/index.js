import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HeroLayout = ({ featuredImage, pageTitle, children }) => (
  <div className="amp-accent">
    <Header />

    {featuredImage && (
      <div className="herolayout__hero">
        <Img fluid={featuredImage} />
      </div>
    )}

    <div className="herolayout__content">
      {pageTitle && <h2 className="page-title">{pageTitle}</h2>}
      {children}
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
