import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../../index';
import { className } from '../../../../util';

import styles from './MealSelector.module.scss';

const mealOptions = [
  {
    key: 'chicken',
    label: 'Chicken',
  },
  {
    key: 'fish',
    label: 'Swordfish',
  },
];

const MealSelector = ({ guestId }) => {
  const { updateGuestRsvp, getGuestMeal } = useContext(RsvpContext);

  const setGuestMeal = (meal) => {
    updateGuestRsvp(guestId, { meal });
  };

  return (
    <ul {...className(styles.options)}>
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
};

export default MealSelector;
