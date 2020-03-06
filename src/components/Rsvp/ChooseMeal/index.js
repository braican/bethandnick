import React, { useContext, useEffect, useState } from 'react';
import { RsvpContext } from '../index';
import MealSelector from './MealSelector';
import RestrictionsInput from './RestrictionsInput';
import OtherGuestMeal from './OtherGuestMeal';

import styles from './ChooseMeal.module.scss';

const ChooseMeal = () => {
  const {
    next,
    previous,
    guest,
    getGuestMeal,
    getOtherGuests,
    getGuestAttending,
  } = useContext(RsvpContext);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentGuestAttending = getGuestAttending(guest.id);
  const currentGuestMeal = getGuestMeal(guest.id);
  const otherGuests = getOtherGuests(true);
  const otherGuestIds = Object.keys(otherGuests);
  const otherGuestChosenMeals = otherGuestIds.filter(id => otherGuests[id].meal !== null).length;

  const handleErrorMessages = () => {
    if (
      currentGuestAttending &&
      currentGuestMeal === null &&
      otherGuestChosenMeals !== otherGuestIds.length
    ) {
      setErrorMessage(
        'Please choose a meal! You\'ll also need to select a meal for anyone else you\'re checking in.'
      );
    } else if (currentGuestAttending && currentGuestMeal === null) {
      setErrorMessage('Please choose a meal for yourself!');
    } else if (otherGuestChosenMeals !== otherGuestIds.length) {
      setErrorMessage('You need to select a meal for anyone that you are checking in.');
    }
  };

  useEffect(() => {
    if (
      ((currentGuestAttending && currentGuestMeal !== null) || !currentGuestAttending) &&
      otherGuestChosenMeals === otherGuestIds.length
    ) {
      setButtonDisabled(false);
      setErrorMessageVisible(false);
      setErrorMessage('');
    } else if (errorMessageVisible) {
      handleErrorMessages();
    }
  }, [getGuestAttending]);

  const handleNext = () => {
    if (buttonDisabled) {
      setErrorMessageVisible(true);
      handleErrorMessages();
    } else {
      setErrorMessage('');
      next();
    }
  };

  return (
    <div className="rsvp--choose-meal">
      <h3>What's for dinner?</h3>

      {/* Current guest */}
      {currentGuestAttending ? (
        <div>
          <p className="big">
            Awesome! We're so excited that you'll be able to attend. What would you like to eat at
            the wedding?
          </p>

          <MealSelector guestId={guest.id} />
          <br />
          <RestrictionsInput guestId={guest.id} />
        </div>
      ) : (
        <div>
          <p>Oh no! We're sorry that you're unable to make&nbsp;it!</p>
        </div>
      )}


      {/* Other guests */}
      {otherGuests && (
        <div className={styles.otherGuests}>
          <p>
            Since you're checking in {otherGuestIds.length > 1 ? 'others' : 'someone else'}, let's
            choose their meal{otherGuestIds.length > 1 ? 's' : ''} as&nbsp;well:
          </p>

          <ul className={styles.otherGuestsList}>
            {otherGuestIds.map(guestId => (
              <li key={guestId}>
                <OtherGuestMeal guest={otherGuests[guestId]} guestId={parseInt(guestId)} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button
          className={`btn btn--primary ${buttonDisabled && 'btn--disabled'}`}
          onClick={handleNext}
        >
          Next
        </button>

        <button className="btn--secondary" onClick={previous}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ChooseMeal;
