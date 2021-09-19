import React from 'react';

import styles from './Promo.module.scss';

import Arrow from '../../svg/arrow-right';

const Promo = () => (
  <div className={styles.promo}>
    <a className={styles.link} href="/rsvp">
      <span>RSVP</span>&nbsp;&nbsp;
      <span className={styles.icon}>
        <Arrow />
      </span>
    </a>
  </div>
);

export default Promo;
