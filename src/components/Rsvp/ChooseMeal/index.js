import React, { useContext, useEffect, useState } from 'react';
import { RsvpContext } from '../index';
import MealSelector from './MealSelector';
import RestrictionsInput from './RestrictionsInput';

import styles from './ChooseMeal.module.scss';

const ChooseMeal = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { next, previous, guest, getGuestMeal, getOtherGuests, getGuestAttending } = useContext(
    RsvpContext
  );
  const currentGuestAttending = getGuestAttending(guest.id);
  const currentGuestMeal = getGuestMeal(guest.id);
  const otherGuests = getOtherGuests(true);
  const otherGuestIds = Object.keys(otherGuests);
  const otherGuestChosenMeals = otherGuestIds.filter(id => otherGuests[id].meal !== null).length;

  const handleErrorMessages = () => {
    if (currentGuestMeal === null && otherGuestChosenMeals !== otherGuestIds.length) {
      setErrorMessage('Please choose a meal! You\'ll also need to select a meal for anyone else you\'re checking in.');
    } else if (currentGuestMeal === null) {
      setErrorMessage('Please choose a meal for yourself!');
    } else if (otherGuestChosenMeals !== otherGuestIds.length) {
      setErrorMessage('You need to select a meal for anyone else you\'re checking in.');
    }
  };

  useEffect(() => {
    if (currentGuestMeal !== null && otherGuestChosenMeals === otherGuestIds.length) {
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
      {currentGuestAttending ? (
        <div>
          <p>
            Awesome! We're so excited that you'll be able to attend. What do you think you'd like to
            eat at the wedding?
          </p>

          <MealSelector guestId={guest.id} extraPadding />
          <RestrictionsInput guestId={guest.id} />
        </div>
      ) : (
        <div>
          <p>Awww, we're disappointed you won't be able to make it.</p>
        </div>
      )}

      {otherGuests && (
        <div className={styles.otherGuests}>
          <p>
            Since you're checking in {otherGuestIds.length > 1 ? 'others' : 'someone else'}, let's
            get their meal{otherGuestIds.length > 1 ? 's' : ''} set up as well:
          </p>

          <ul>
            {otherGuestIds.map(guestId => {
              const otherGuest = otherGuests[guestId];
              return (
                <li key={guestId} className={styles.otherGuestListItem}>
                  <span>Choose a meal for{' '}<span className={styles.otherGuestName}>{otherGuest.name}:</span></span>

                  <MealSelector guestId={otherGuest.id} />
                  <RestrictionsInput guestId={otherGuest.id} />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className={styles.actions}>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button className={`btn ${buttonDisabled && 'btn--disabled'}`} onClick={handleNext}>
          Next
        </button>

        <button className='btn--secondary' onClick={previous}>Back</button>
      </div>
    </div>
  );
};

export default ChooseMeal;
