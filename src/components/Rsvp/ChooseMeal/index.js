import React, { useContext } from 'react';
import { RsvpContext } from '../index';
import MealSelector from './MealSelector';

const ChooseMeal = () => {
  const {
    next,
    previous,
    guest,
    updateGuestRsvp,
    getGuestMeal,
    getOtherGuests,
    getGuestAttending,
  } = useContext(RsvpContext);
  const currentGuestAttending = getGuestAttending(guest.ID);
  const otherGuests = getOtherGuests(true);
  const otherGuestIds = Object.keys(otherGuests);

  const setGuestMeal = (guestId, meal) => {
    updateGuestRsvp(guestId, { meal });
  };

  return (
    <div className="rsvp--choose-meal">
      {currentGuestAttending ? (
        <div>
          <p>
          Awesome! We're so excited that you'll be able to attend. What do you think you'd like to eat
          at the wedding?
          </p>
          <MealSelector
            name="attendee_meal"
            checked={getGuestMeal(guest.ID)}
            onChange={event => setGuestMeal(guest.ID, event.target.value)}
          />
        </div>
      ) : (
        <div>
          <p>Awww, we're disappointed you won't be able to make it.</p>
        </div>
      )}


      {otherGuests && (
        <div>
          <p>Choose a meal for the attending guest{otherGuestIds.length > 1 ? 's' : ''} you're checking in:</p>

          <ul>
            {otherGuestIds.map(guestId => {
              const otherGuest = otherGuests[guestId];
              return (
                <li key={guestId}>
                  {otherGuest.post_title}

                  <MealSelector
                    name={`attendee_meal_${otherGuest.ID}`}
                    checked={getGuestMeal(otherGuest.ID)}
                    onChange={event => setGuestMeal(otherGuest.ID, event.target.value)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button className="btn" disabled={getGuestMeal(guest.ID) === null} onClick={next}>
        Next
      </button>

      <button onClick={previous}>Back</button>
    </div>
  );
};

export default ChooseMeal;
