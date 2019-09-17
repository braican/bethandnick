import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import Header from '../../components/Header';
import MenuToggle from '../Buttons/MenuToggle';
import CloseButton from '../Buttons/Close';

import { className } from '../../util';

import styles from './Nav.module.scss';

const Nav = ({ allWordpressPage, theme }) => {
  const [navOpen, setNavOpen] = useState(false);

  const openNav = () => {
    setNavOpen(true);
    document.body.classList.add('prevent-scroll');
  };

  const closeNav = () => {
    setNavOpen(false);
    document.body.classList.remove('prevent-scroll');
  };

  return (
    <nav {...className(styles.nav, styles[`nav${theme}`])}>
      <MenuToggle onClick={openNav} className={styles.menuToggle} />

      <div {...className(styles.navWrapper, navOpen && styles.navWrapperOpen)}>
        <CloseButton className={styles.closeNav} onClick={closeNav} />

        <Header inNav />

        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.link} activeClassName={styles.linkActive} onClick={closeNav}>
            Home
            </Link>
          </li>
          {allWordpressPage.edges
            .filter(({ node }) => node.slug !== 'home')
            .map(({ node }) => (
              <li key={node.id} className={styles.menuItem}>
                <Link
                  to={`/${node.slug}/`}
                  className={styles.link}
                  activeClassName={styles.linkActive}
                  onClick={closeNav}
                >
                  {node.acf.menu_label || node.title}
                </Link>
              </li>
            ))}
          <li className={styles.menuItem}>
            <Link
              to="/gallery/"
              className={styles.link}
              activeClassName={styles.linkActive}
              onClick={closeNav}
            >
            Photos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

};

Nav.propTypes = {
  allWordpressPage: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
  theme: PropTypes.oneOf(['primary', 'white']),
};

Nav.defaultProps = {
  theme: 'primary',
};

export const mainNavQuery = graphql`
  query MainNavQuery{
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

const NavWithQuery = props => (
  <StaticQuery
    query={mainNavQuery}
    render={data => <Nav {...props} {...data} />}
  />
);

export default NavWithQuery;
