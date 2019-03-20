import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import './header.scss';

const HeaderBanner = () => (
  <h1 className="header__banner">
    <span>Beth</span>
    <span>&amp;</span>
    <span>Nick</span>
  </h1>
);

const Header = ({ wordpressBethandnickInfo: info, contextClass, linkTitle }) => (
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
        <span className="wedding-info__date">{info.wedding_date}</span>
        <br />
        <span className="wedding-info__venue">at {info.venue_name}</span>
      </p>
    </div>
  </div>
);

Header.propTypes = {
  wordpressBethandnickInfo: PropTypes.shape({
    wedding_date: PropTypes.string,
    venue_name: PropTypes.string,
  }),
  contextClass: PropTypes.string,
  linkTitle: PropTypes.bool,
};

const HeaderWithQuery = () => (
  <StaticQuery
    query={graphql`
      query HeaderStaticQuery {
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={Header}
  />
);

export default HeaderWithQuery;
