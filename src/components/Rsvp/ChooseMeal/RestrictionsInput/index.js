import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../../index';

import styles from './RestrictionsInput.module.scss';

const RestrictionsInput = ({ guestId }) => {
  const { updateGuestRsvp, getGuestRestrictions } = useContext(RsvpContext);

  const setGuestRestriction = event => {
    const restrictions = event.target.value;
    updateGuestRsvp(guestId, { restrictions } );
  };

  return (
    <label>
      <span className={styles.label}>Note any food allergies or dietary restrictions here:</span>
      <input
        className={styles.input}
        type="text"
        value={getGuestRestrictions(guestId) || ''}
        onChange={event => setGuestRestriction(event)}
      />
    </label>
  );
};

RestrictionsInput.propTypes = {
  guestId: PropTypes.number.isRequired,
};

export default RestrictionsInput;
