import React from 'react';
import { Link } from 'gatsby';

import styles from './CovidAlert.module.scss';

const CovidAlert = () => (
  <div className={styles.alert}>
    Due to the ongoing situation with Covid-19, we've opted to postpone our wedding until December
    18th of 2021.
  </div>
);

export default CovidAlert;
