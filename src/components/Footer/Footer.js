import React from 'react';
import './footer.scss';

const Footer = () => (
  <footer className="site-footer l-main">
    <p>
      &copy; {new Date().getFullYear()} Beth and <a target="_blank" rel="noopener noreferrer" href="https://www.braican.com">Nick</a>
    </p>
  </footer>
);

export default Footer;
