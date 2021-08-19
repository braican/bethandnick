import React, { useContext, useEffect, useState } from 'react';
import { RsvpContext } from '../index';
import MealSelector from './MealSelector';
import RestrictionsInput from './RestrictionsInput';
import OtherGuestMeal from './OtherGuestMeal';
import AlertMessage from '../../AlertMessage';

import styles from './ChooseMeal.module.scss';

const ChooseMeal = () => {
  const {
    next,
    previous,
    guest,
    getGuestMeal,
    getOtherGuests,
    getGuestAttending,
    getGuestVegetarian,
  } = useContext(RsvpContext);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentGuestAttending = getGuestAttending(guest.id);
  const currentGuestMeal = getGuestMeal(guest.id);
  const currentGuestVegetarian = getGuestVegetarian(guest.id);
  const otherGuests = getOtherGuests(true);
  const otherGuestIds = Object.keys(otherGuests);
  const otherGuestChosenMeals = otherGuestIds.filter(
    (id) => otherGuests[id].meal !== null || otherGuests[id].vegetarian === true
  ).length;

  const handleErrorMessages = () => {
    if (
      currentGuestAttending &&
      currentGuestMeal === null &&
      otherGuestChosenMeals !== otherGuestIds.length
    ) {
      setErrorMessage(
        `Please choose a meal! You'll also need to select a meal for anyone else you're checking in.`
      );
    } else if (currentGuestAttending && currentGuestMeal === null) {
      setErrorMessage('Please choose a meal for yourself!');
    } else if (otherGuestChosenMeals !== otherGuestIds.length) {
      setErrorMessage('You need to select a meal for anyone that you are checking in.');
    }
  };

  const validCurrentGuestSelection = () =>
    currentGuestMeal !== null || currentGuestVegetarian === true;

  useEffect(() => {
    if (
      ((currentGuestAttending && validCurrentGuestSelection()) || !currentGuestAttending) &&
      otherGuestChosenMeals === otherGuestIds.length
    ) {
      setButtonDisabled(false);
      setErrorMessageVisible(false);
      setErrorMessage('');
    } else if (errorMessageVisible) {
      handleErrorMessages();
    } else {
      setButtonDisabled(true);
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
            Awesome! We’re so excited that you'll be able to attend. What would you like for dinner?
          </p>

          <MealSelector guestId={guest.id} expanded />
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
          <ul className={styles.otherGuestsList}>
            {otherGuestIds.map((guestId) => (
              <li key={guestId}>
                <OtherGuestMeal guest={otherGuests[guestId]} guestId={parseInt(guestId)} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {errorMessage && <AlertMessage>{errorMessage}</AlertMessage>}

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
