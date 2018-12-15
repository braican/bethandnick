import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ siteTitle }) => (
  <div className="header">
    <div className="header__meta">
      <h1 className="header__banner">
        {siteTitle.split(' ').map(part => (
          <span key={part}>{part}</span>
        ))}
      </h1>
    </div>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

export default Header;