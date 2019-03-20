import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HeroLayout = ({ location, featuredImage, pageTitle, children }) => {
  const title = location === 'home' ? null : pageTitle;
  const linkTitle = location === 'home' ? false : true;

  return (
    <Wrapper contextClass={`main layout--hero page--${location || 'base'}`}>
      <Header contextClass="header--main" linkTitle={linkTitle} />

      {featuredImage && (
        <div className="herolayout__hero">
          <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
        </div>
      )}

      <div className="herolayout__content">
        {title ? <h2 className="page-title">{title}</h2> : null}
        {children}
      </div>

      <Footer />
    </Wrapper>
  );
};

HeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
  featuredImage: PropTypes.object,
  pageTitle: PropTypes.string,
};

export default HeroLayout;
