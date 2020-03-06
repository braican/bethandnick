import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../../index';
import { className } from '../../../../util';
import mealOptions from '../../_data/meals';

import styles from './MealSelector.module.scss';

const MealSelector = ({ guestId, compact = false }) => {
  const { updateGuestRsvp, getGuestMeal } = useContext(RsvpContext);

  const setGuestMeal = meal => {
    updateGuestRsvp(guestId, { meal });
  };

  return (
    <ul {...className(styles.options, compact && styles.optionsCompact)}>
      {mealOptions.map(({ key, label }) => (
        <li key={key} className={styles.option}>
          <label>
            <input
              type="radio"
              name={`attendee_meal_${guestId}`}
              value={label}
              checked={getGuestMeal(guestId) === label}
              onChange={() => setGuestMeal(label)}
            />
            <span className={styles.optionLabel}>{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

MealSelector.propTypes = {
  guestId: PropTypes.number.isRequired,
  compact: PropTypes.bool,
};

export default MealSelector;
