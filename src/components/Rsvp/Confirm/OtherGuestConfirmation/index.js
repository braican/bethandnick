import React from 'react';
import PropTypes from 'prop-types';

import AlertMessage from '../../../AlertMessage';

import { className } from '../../../../util';

import styles from './OtherGuestConfirmation.module.scss';

const OtherGuestConfirmation = ({
  guest: { attending, name, meal, vegetarian, glutenFree, restrictions },
}) => {
  if (meal === null && vegetarian) {
    meal = 'vegetarian option';
  }

  const DisplayRestrictions = () => {
    const restrictionText = restrictions ? `, and have noted the following: ${restrictions}` : '';

    if (vegetarian && glutenFree) {
      return <p>We've also got them down as Vegetarian and Gluten Free{restrictionText}.</p>;
    }
    if (vegetarian) {
      return <p>We've also got them down as Vegetarian{restrictionText}.</p>;
    }
    if (glutenFree) {
      return <p>We've also got them down as Gluten Free{restrictionText}.</p>;
    }

    if (restrictions) {
      return <p>We've also noted the following: {restrictions}</p>;
    }

    return null;
  };

  return (
    <div {...className(styles.guest, attending ? styles.statusAttending : styles.statusDeclined)}>
      {attending ? (
        <p className={styles.guestName}>
          <strong>{name}</strong> will be attending and will have the{' '}
          <strong>{meal.toLowerCase()}</strong> for dinner.
        </p>
      ) : (
        <p className={styles.guestName}>is unable to attend.</p>
      )}

      {attending && (vegetarian || glutenFree || restrictions) && <DisplayRestrictions />}

      {attending && vegetarian && meal !== 'vegetarian option' && (
        <AlertMessage>
          Looks like you've indicated that this guest is a vegetarian, but have also chosen a meal
          with meat. Just want to double check that you meant to do this.
        </AlertMessage>
      )}
    </div>
  );
};

OtherGuestConfirmation.propTypes = {
  guest: PropTypes.shape({
    attending: PropTypes.bool,
    name: PropTypes.string.isRequired,
    meal: PropTypes.string,
    vegetarian: PropTypes.bool,
    glutenFree: PropTypes.bool,
    restrictions: PropTypes.string,
  }).isRequired,
};

export default OtherGuestConfirmation;
