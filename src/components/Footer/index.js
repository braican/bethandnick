import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      &copy; {new Date().getFullYear()} Beth and <a target="_blank" rel="noopener noreferrer" href="https://www.braican.com">Nick</a>
    </p>
  </footer>
);

export default Footer;
