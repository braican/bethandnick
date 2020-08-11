import React from 'react';
import { Link } from 'gatsby';

import styles from './Promo.module.scss';

import Arrow from '../../svg/arrow-right';

const Promo = () => (
  <div className={styles.promo}>
    <Link className={styles.link} to="/accommodations/">
      <span>Book your hotel now</span>&nbsp;&nbsp;
      <span className={styles.icon}>
        <Arrow />
      </span>
    </Link>
  </div>
);

export default Promo;
