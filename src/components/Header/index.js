import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './header.scss';

const HeaderBanner = () => (
  <h1 className="header__banner">
    <span>Beth</span>
    <span>&amp;</span>
    <span>Nick</span>
  </h1>
);
const Header = ({ contextClass, weddingDate, venueName, pageTitle, linkTitle }) => (
  <div className={`header ${contextClass || ''}`}>
    <div className="header__meta">
      {linkTitle ? (
        <Link to="/">
          <HeaderBanner />
        </Link>
      ) : (
        <HeaderBanner />
      )}

      <p className="header__wedding-info">
        <span className="wedding-info__date">{weddingDate}</span>
        <br />
        <span className="wedding-info__venue">at {venueName}</span>
      </p>
    </div>

    {pageTitle ? <h2 className="header__page-title">{pageTitle}</h2> : null}
  </div>
);

Header.propTypes = {
  contextClass: PropTypes.string,
  weddingDate: PropTypes.string,
  venueName: PropTypes.string,
  pageTitle: PropTypes.string,
  linkTitle: PropTypes.bool,
};

export default Header;
