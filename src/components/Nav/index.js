import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import Header from '../../components/Header';

import closeIcon from '../../svg/close.svg';
import hamburgerIcon from '../../svg/hamburger.svg';

import './nav.scss';

class Nav extends React.Component {
  constructor() {
    super();

    this.toggleNav = this.toggleNav.bind(this);

    this.state = {
      open: false,
    };
  }

  toggleNav(event) {
    event.preventDefault();
    const isOpen = this.state.open;
    this.setState({
      open: !isOpen,
    });
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressPage(sort: { fields: [menu_order], order: ASC }) {
              edges {
                node {
                  id
                  title
                  menu_label
                  slug
                }
              }
            }
          }
        `}
        render={data => (
          <nav className="mainnav">
            <button className="mainnav__trigger" onClick={this.toggleNav}>
              <span className="mainnav__trigger-label">Menu</span>
              <span className="mainnav__trigger-icon">
                <svg>
                  <use xlinkHref={`#${hamburgerIcon.id}`} />
                </svg>
              </span>
            </button>
            <div className={`mainnav__wrapper${this.state.open ? ' mainnav__wrapper--open' : ''}`}>
              <button className="mainnav__close" onClick={this.toggleNav}>
                <svg>
                  <use xlinkHref={`#${closeIcon.id}`} />
                </svg>
              </button>

              <Header weddingDate={this.props.weddingDate} venueName={this.props.venueName} />

              <ul className="mainnav__menu">
                <li className="mainnav__item">
                  <Link to="/" className="mainnav__link" activeClassName="mainnav__link--active">
                    Home
                  </Link>
                </li>
                {data.allWordpressPage.edges
                  .filter(({ node }) => node.slug !== 'home')
                  .map(({ node }) => (
                    <li key={node.id} className="mainnav__item">
                      <Link
                        to={`/${node.slug}`}
                        className="mainnav__link"
                        activeClassName="mainnav__link--active"
                      >
                        {node.menu_label || node.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </nav>
        )}
      />
    );
  }
}

Nav.propTypes = {
  weddingDate: PropTypes.string,
  venueName: PropTypes.string,
};

export default Nav;
