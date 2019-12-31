import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { className } from '../../util';

import styles from './Promo.module.scss';

const Promo = ({ floating = false }) => (
  <div {...className(floating ? styles.floatingPromo : styles.inlinePromo)}>
    <Link className={styles.link} to="/accommodations"><span>Book your hotel now!</span></Link>
  </div>
);

Promo.propTypes = {
  floating: PropTypes.bool,
};

Promo.defaultProps = {
  floating: false,
};

export default Promo;
