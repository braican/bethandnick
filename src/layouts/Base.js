import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { trailingSlashIt } from '../util';

import PageTransition from '../components/PageTransition';
import Nav from '../components/Nav';

const BaseLayout = ({ children, location }) => {

  const internalNavigate = event => {
    event.preventDefault();
    navigate(trailingSlashIt(event.target.getAttribute('href')));
  };

  useEffect(() => {
    document.body.classList.remove('prevent-scroll');
  }, []);

  useEffect(() => {
    const internalLinks = document.querySelectorAll('a[data-internal="true"]');

    if (internalLinks.length) {
      internalLinks.forEach(link => {
        link.addEventListener('click', internalNavigate);
      });
    }

    return () => {
      if (internalLinks.length) {
        internalLinks.forEach(link => {
          link.removeEventListener('click', internalNavigate);
        });
      }
    };
  });

  return (
    <div className="site__wrap">
      <PageTransition location={location}>
        <div>
          {children}
        </div>
      </PageTransition>
      <Nav />
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
};

BaseLayout.defaultProps = {
  children: null,
};

export default BaseLayout;
