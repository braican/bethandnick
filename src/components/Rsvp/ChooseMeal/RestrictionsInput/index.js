import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../../index';

import styles from './RestrictionsInput.module.scss';

const RestrictionsInput = ({ guestId }) => {
  const { updateGuestRsvp, getGuestRestrictions } = useContext(RsvpContext);

  const setGuestRestriction = (event) => {
    const restrictions = event.target.value;
    updateGuestRsvp(guestId, { restrictions });
  };

  return (
    <>
      <p>Choose any that apply:</p>

      <div className={styles.controlWrapper}>
        <label>
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={(event) => updateGuestRsvp(guestId, { vegetarian: event.target.checked })}
          />
          <span className={styles.checkLabel}>Vegetarian</span>
        </label>
      </div>

      <div className={styles.controlWrapper}>
        <label>
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={(event) => updateGuestRsvp(guestId, { glutenFree: event.target.checked })}
          />
          <span className={styles.checkLabel}>Gluten Free</span>
        </label>
      </div>

      <div className={styles.controlWrapperLarge}>
        <label>
          <span className={styles.label}>Anything else we should know?</span>
          <input
            className={styles.input}
            type="text"
            value={getGuestRestrictions(guestId) || ''}
            onChange={(event) => setGuestRestriction(event)}
            placeholder="Food allergies, no peas, etc..."
          />
        </label>
      </div>
    </>
  );
};

RestrictionsInput.propTypes = {
  guestId: PropTypes.number.isRequired,
};

export default RestrictionsInput;
