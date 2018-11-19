import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import './nav.scss';

const Nav = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: [menu_order], order: ASC }) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <nav className="mainnav">
        <ul className="mainnav__menu">
          <li className="mainnav__item">
            <Link to="/" className="mainnav__link">
              Home
            </Link>
          </li>
          {data.allWordpressPage.edges
            .filter(({ node }) => node.slug !== 'home')
            .map(({ node }) => (
              <li key={node.id} className="mainnav__item">
                <Link to={`/${node.slug}`} className="mainnav__link">
                  {node.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    )}
  />
);

Nav.propTypes = {
  page: PropTypes.array
};

export default Nav;
