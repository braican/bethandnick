import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import './Header.scss';

const HeaderBanner = () => (
  <h1 className="HeaderBanner">
    <span>Beth</span>
    <span>&amp;</span>
    <span>Nick</span>
  </h1>
);

const Header = ({ info, contextClass, linkTitle = true }) => (
  <div className={`Header ${contextClass || ''}`}>
    <div className="meta">
      {linkTitle ? (
        <Link to="/">
          <HeaderBanner />
        </Link>
      ) : (
        <HeaderBanner />
      )}

      <p className="wedding-info">
        <span className="wedding-info__date">{info.wedding_date}</span>
        <br />
        <span className="wedding-info__venue">at {info.venue_name}</span>
      </p>
    </div>
  </div>
);

Header.propTypes = {
  info: PropTypes.shape({
    wedding_date: PropTypes.string,
    venue_name: PropTypes.string,
  }),
  contextClass: PropTypes.string,
  linkTitle: PropTypes.bool,
};

Header.defaultProps = {
  linkTitle: true,
};

const HeaderWithQuery = props => (
  <StaticQuery
    query={graphql`
      query HeaderStaticQuery {
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => <Header {...props} info={data.wordpressBethandnickInfo} />}
  />
);

export default HeaderWithQuery;
