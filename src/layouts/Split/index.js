import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import { className } from '../../util';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SplitLayout = ({ featuredImage, bigHeader, pageTitle = '', children }) => (
  <div className="amp-accent amp-accent--split amp-accent--overflow">
    <Header big={bigHeader} fixed />

    <div className="splitpane__img">
      {featuredImage ? (
        <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
      ) : null}
    </div>

    <div {...className('splitpane__content', bigHeader && 'splitpane__content--bigheader')}>
      {pageTitle && <h1 className="h1">{pageTitle}</h1>}

      {children}
      <Footer />
    </div>
  </div>
);

SplitLayout.propTypes = {
  featuredImage: PropTypes.object,
  bigHeader: PropTypes.bool,
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};

SplitLayout.defaultProps = {
  featuredImage: null,
  bigHeader: false,
  children: null,
};

export default SplitLayout;
