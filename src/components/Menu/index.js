import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import styles from './Menu.module.scss';

const Menu = ({
  allWordpressPage,
  main = false,
  ulClass,
  liClass,
  linkClass,
  activeClass,
  onClick,
}) => (
  <ul className={ulClass}>
    <li className={liClass}>
      <Link to="/" className={linkClass} activeClassName={activeClass} onClick={onClick}>
        Home
      </Link>
    </li>
    {allWordpressPage.edges
      .filter(({ node }) => node.slug !== 'home')
      .map(({ node }) => (
        <li key={node.id} className={liClass}>
          <Link
            to={`/${node.slug}/`}
            className={linkClass}
            activeClassName={activeClass}
            onClick={onClick}
          >
            {node.acf.menu_label || node.title}
            {/* {main && node.slug === 'accommodations' && <span className={styles.linkFootnote}>Book your hotel!</span>} */}
          </Link>
        </li>
      ))}
    <li className={liClass}>
      <Link to="/gallery/" className={linkClass} activeClassName={activeClass} onClick={onClick}>
        Photos
      </Link>
    </li>
  </ul>
);

Menu.propTypes = {
  allWordpressPage: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
  main: PropTypes.bool,
  ulClass: PropTypes.string,
  liClass: PropTypes.string,
  linkClass: PropTypes.string,
  activeClass: PropTypes.string,
  onClick: PropTypes.func,
};

export const pagesQuery = graphql`
  query NavPagesQuery {
    allWordpressPage(sort: { fields: [menu_order], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          acf {
            menu_label
          }
        }
      }
    }
  }
`;

const MenuWithQuery = props => (
  <StaticQuery query={pagesQuery} render={data => <Menu {...props} {...data} />} />
);

export default MenuWithQuery;
