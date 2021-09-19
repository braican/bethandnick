import React from 'react';
import PropTypes from 'prop-types';
import MealSelector from '../MealSelector';
import RestrictionsInput from '../RestrictionsInput';
import { getFirstName } from '../../../../util';

import styles from './OtherGuestMeal.module.scss';

const OtherGuestMeal = ({ guest: { name }, guestId }) => (
  <div className={styles.guestItem}>
    <div className={styles.guestlistInner}>
      <span className={styles.guestPrompt}>
        How about dinner for <span className={styles.guestName}>{getFirstName(name)}:</span>
      </span>
      <div className={styles.mealSelector}>
        <MealSelector guestId={guestId} />
      </div>
    </div>
    <div>
      <RestrictionsInput guestId={guestId} />
    </div>
  </div>
);

OtherGuestMeal.propTypes = {
  guest: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  guestId: PropTypes.number.isRequired,
};

export default OtherGuestMeal;
