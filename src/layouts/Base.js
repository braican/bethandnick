import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import PageTransition from '../components/PageTransition';
import Nav from '../components/Nav';

const BaseLayout = ({ children, pageContext, location }) => {
  useEffect(() => {
    document.body.classList.remove('prevent-scroll');
  }, []);

  let theme = 'primary';

  const whiteNav = ['home'];
  if (whiteNav.includes(pageContext.slug)) {
    theme = 'white';
  }

  return (
    <div className="site__wrap">
      <PageTransition location={location}>
        <div>
          {children}
        </div>
      </PageTransition>
      <Nav theme={theme} />
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.shape({
    slug: PropTypes.string,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

BaseLayout.defaultProps = {
  children: null,
};

export default BaseLayout;
