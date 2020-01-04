import React from 'react';
import PropTypes from 'prop-types';

import styles from './Success.module.scss';

const ConfirmYes = ({ name, meal, restrictions }) => (
  <div className={styles.confirmYes}>
    <p className={styles.lede}>Alright {name}, we've got you down as a&nbsp;yes!</p>
    <p>
      Just to confirm, you've selected <strong>{meal.toLowerCase()}</strong> for your meal option
      and you've indicated{' '}
      {restrictions ? `the following dietary restrictions: ${restrictions}.` : 'no restrictions.'}
    </p>
    <p>
      Don't forget to mark your calendar for October 17th of this year! We can't wait to celebrate
      with you.
    </p>
  </div>
);

ConfirmYes.propTypes = {
  name: PropTypes.string,
  meal: PropTypes.string,
  restrictions: PropTypes.string,
};
