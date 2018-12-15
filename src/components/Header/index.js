import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ siteTitle, weddingDate, venueName }) => (
  <div className="header">
    <div className="header__meta">
      <h1 className="header__banner">
        {siteTitle.split(' ').map(part => (
          <span key={part}>{part}</span>
        ))}
      </h1>
      <p className="infobox__wedding-info">
        <span className="wedding-info__date">{weddingDate}</span>
        <br />
        <span className="wedding-info__venue">at {venueName}</span>
      </p>
    </div>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  weddingDate: PropTypes.string,
  venueName: PropTypes.string
};

export default Header;
