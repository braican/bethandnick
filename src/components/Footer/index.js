import React from 'react';
import Menu from '../Menu';

import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.copyright}>
      &copy; {new Date().getFullYear()} Beth and{' '}
      <a target="_blank" rel="noopener noreferrer" href="https://www.braican.com">
        Nick
      </a>
    </p>

    <Menu liClass={styles.navListItem} activeClass={styles.activeNavLink} />
  </footer>
);

export default Footer;
