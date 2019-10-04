import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SplitLayout = ({ featuredImage, bigHeader, children }) => (
  <div className="amp-accent amp-accent--split amp-accent--overflow">
    <Header big={bigHeader} />

    <div className="splitpane__img">
      {featuredImage ? (
        <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
      ) : null}
    </div>

    <div className="splitpane__content">
      {children}
      <Footer />
    </div>
  </div>
);

SplitLayout.propTypes = {
  featuredImage: PropTypes.object,
  bigHeader: PropTypes.bool,
  children: PropTypes.node,
};

SplitLayout.defaultProps = {
  featuredImage: null,
  bigHeader: false,
  children: null,
};

export default SplitLayout;
