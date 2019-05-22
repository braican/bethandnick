import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import './header.scss';

const OptionalLink = ({ linkTitle, children }) => linkTitle ? <Link to="/">{children}</Link> : children;

OptionalLink.propTypes = {
  linkTitle: PropTypes.bool,
  children: PropTypes.node,
};

const Header = ({ info, contextClass, isNav, linkTitle = true }) => (
  <div className={`Header ${contextClass || ''}${isNav ? '' : ' Header--main'}`}>
    <div className="header__wrap">
      <OptionalLink linkTitle={linkTitle}>
        <h1 className="wedding-title">
          <span>Beth</span>
          <span>&amp;</span>
          <span>Nick</span>
        </h1>
      </OptionalLink>

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
  isNav: PropTypes.bool,
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
