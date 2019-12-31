import React from 'react';
import { Link } from 'gatsby';

import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.main}>
      <div className={styles.mainContent}>
        <p>Beth &amp; Nick | October 17, 2020</p>

        {/* Footer promo */}
        <p><Link className={styles.footerPromo} to="/accommodations/">Book your hotel!</Link></p>
      </div>
    </div>

    <p className={styles.copyright}>
      &copy; {new Date().getFullYear()} Beth &amp;{' '}
      <a target="_blank" rel="noopener noreferrer" href="https://www.braican.com">
        Nick
      </a>
    </p>
  </footer>
);

export default Footer;
