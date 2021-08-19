import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';
import { indicatesNoRestriction, getFirstName } from '../../../util';

import styles from './Confirm.module.scss';

const CurrentGuestConfirmation = ({ guest }) => {
  const { getGuestAttending, getGuestMeal, getGuestRestrictions } = useContext(RsvpContext);

  const attending = getGuestAttending(guest.id);
  const name = getFirstName(guest.name);
  const meal = getGuestMeal(guest.id);
  const restrictions = getGuestRestrictions(guest.id);

  console.log(restrictions);

  return (
    <div className={styles.currentGuest}>
      <p className={styles.currentStatus}>
        OK {name}, let's just confirm:{' '}
        {true === attending ? (
          <>
            you <strong>will be attending the wedding</strong>{' '}
            <span className={styles.happyEmoji} role="img" aria-label="whoop">
              🎉
            </span>
            , and you'll be having the <strong>{meal.toLowerCase()}</strong> (great choice).
          </>
        ) : (
          <>
            <strong>you are unable to attend</strong>{' '}
            <span className={styles.sadEmoji} role="img" aria-label="sad">
              😞
            </span>
            .
          </>
        )}
      </p>

      {attending && restrictions && (
        <p>
          {indicatesNoRestriction(restrictions.toLowerCase())
            ? "You've also indicated that you have no dietary restrictions."
            : `You've also indicated the following dietary restriction: ${restrictions}.`}
        </p>
      )}
    </div>
  );
};

CurrentGuestConfirmation.propTypes = {
  guest: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrentGuestConfirmation;
