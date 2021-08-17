import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Menu from '../Menu';
import MenuToggle from '../Buttons/MenuToggle';
import CloseButton from '../Buttons/Close';

import { className } from '../../util';

import styles from './Nav.module.scss';

const Nav = ({ location }) => {
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
    <nav className={styles.nav}>
      <MenuToggle onClick={openNav} pathname={location.pathname} />

      <div {...className(styles.navWrapper, navOpen && styles.navWrapperOpen)}>
        <CloseButton className={styles.closeNav} onClick={closeNav} />

        <Header inNav />

        <Menu
          main
          ulClass={styles.menu}
          liClass={styles.menuItem}
          linkClass={styles.link}
          activeClass={styles.linkActive}
          onClick={closeNav}
        />
      </div>
    </nav>
  );
};

Nav.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Nav;
