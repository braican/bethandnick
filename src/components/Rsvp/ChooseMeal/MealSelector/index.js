import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../../index';
import { className } from '../../../../util';

import CheckIcon from '../../../../svg/check.svg';

import styles from './MealSelector.module.scss';

const mealOptions = [
  {
    key: 'chicken',
    label: 'Chicken',
    description: 'Apple, sage, and Gouda stuffed free-range chicken, cider balsamic sauce.',
  },
  {
    key: 'fish',
    label: 'Swordfish',
    description:
      'Herb marinated grilled swordfish, sweet pepper salad, smoked paprika, caramalized shallot butter (gluten free).',
  },
];

const MealSelector = ({ guestId }) => {
  const { updateGuestRsvp, getGuestMeal } = useContext(RsvpContext);

  const setGuestMeal = (meal) => {
    updateGuestRsvp(guestId, { meal });
  };

  return (
    <ul {...className(styles.options)}>
      {mealOptions.map(({ key, label, description }) => (
        <li key={key} className={styles.option}>
          <label>
            <input
              type="checkbox"
              name={`attendee_meal_${guestId}`}
              value={label}
              checked={getGuestMeal(guestId) === label}
              onChange={(event) =>
                event.target.checked ? setGuestMeal(label) : setGuestMeal(null)
              }
            />
            <p className={styles.optionLabel}>
              <strong>
                <span>{label}&nbsp;</span>
                <span className={styles.checkIcon}>
                  <CheckIcon />
                </span>
              </strong>{' '}
              {description}
            </p>
          </label>
        </li>
      ))}
    </ul>
  );
};

MealSelector.propTypes = {
  guestId: PropTypes.number.isRequired,
  expanded: PropTypes.bool,
};

export default MealSelector;
