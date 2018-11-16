import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './nav.scss';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      statusClass: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        statusClass: 'mainnav--active'
      });
    }, 200);
  }

  render() {
    return (
      <nav className={`mainnav ${this.state.statusClass}`}>
        <ul className="mainnav__menu">
          <li className="mainnav__item">
            <Link to="/" className="mainnav__link">
              Home
            </Link>
          </li>
          {this.props.pages.filter(({ node }) => node.slug !== 'home').map(({ node }) => (
            <li key={node.id} className="mainnav__item">
              <Link to={`/${node.slug}`} className="mainnav__link">
                {node.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  page: PropTypes.array
};

export default Nav;
