import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SimpleLayout = ({ children }) => (
  <div className="amp-accent">
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </div>
);

SimpleLayout.propTypes = {
  children: PropTypes.node,
};

SimpleLayout.defaultProps = {
  children: null,
};

export default SimpleLayout;
