import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SplitLayout = ({ location, featuredImage, pageTitle, children }) => {
  const title = location === 'home' ? null : pageTitle;

  return (
    <Wrapper contextClass={`main page--${location || 'base'}`}>
      <div className="splitpane__img">
        {featuredImage ? (
          <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
        ) : null}
      </div>

      <div className="splitpane__content">
        <Header contextClass="header--main" linkTitle={location !== 'home'} />
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
};

export default SplitLayout;
