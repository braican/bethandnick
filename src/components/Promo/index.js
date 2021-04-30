import React from 'react';

import styles from './Promo.module.scss';

import Arrow from '../../svg/arrow-right';

const Promo = () => (
  <div className={styles.promo}>
    <a
      className={styles.link}
      target="_blank"
      rel="noreferrer"
      href="https://www.marriott.com/events/start.mi?id=1610571819651&key=GRP"
    >
      <span>Book your hotel now</span>&nbsp;&nbsp;
      <span className={styles.icon}>
        <Arrow />
      </span>
    </a>
  </div>
);

export default Promo;
