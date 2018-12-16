import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ contextClass, weddingDate, venueName, pageTitle }) => (
  <div className={`header ${contextClass || ''}`}>
    <div className="header__meta">
      <h1 className="header__banner">
        <span>Nick</span>
        <span>&amp;</span>
        <span>Beth</span>
      </h1>
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
  pageTitle: PropTypes.string
};

export default Header;
