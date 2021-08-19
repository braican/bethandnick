import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';
import AlertMessage from '../../AlertMessage';
import { getFirstName } from '../../../util';

import styles from './Confirm.module.scss';

const CurrentGuestConfirmation = ({ guest }) => {
  const {
    getGuestAttending,
    getGuestMeal,
    getGuestRestrictions,
    getGuestVegetarian,
    getGuestglutenFree,
  } = useContext(RsvpContext);

  const attending = getGuestAttending(guest.id);
  const name = getFirstName(guest.name);
  let meal = getGuestMeal(guest.id);
  const vegetarian = getGuestVegetarian(guest.id);
  const glutenFree = getGuestglutenFree(guest.id);
  const otherRestrictions = getGuestRestrictions(guest.id);

  if (meal === null && vegetarian) {
    meal = 'vegetarian option';
  }

  const DisplayRestrictions = () => {
    const restrictionText = otherRestrictions
      ? `, and have noted the following: ${otherRestrictions}`
      : '';

    if (vegetarian && glutenFree) {
      return <p>We've got you down as Vegetarian and Gluten Free{restrictionText}.</p>;
    }
    if (vegetarian) {
      return <p>We've got you down as Vegetarian{restrictionText}.</p>;
    }
    if (glutenFree) {
      return <p>We've got you down as Gluten Free{restrictionText}.</p>;
    }

    if (otherRestrictions) {
      return <p>We've also noted the following: {otherRestrictions}</p>;
    }

    return null;
  };

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

      {attending && <DisplayRestrictions />}

      {attending && vegetarian && meal !== 'vegetarian option' && (
        <AlertMessage>
          Looks like you've indicated that you're a vegetarian, but have also chosen a meal with
          meat. Just want to double check that you meant to do this.
        </AlertMessage>
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
