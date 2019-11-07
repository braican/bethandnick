import React, { useState, useContext } from 'react';

import mealOptions from './data/meals';

import { RsvpContext } from '../index';

const Guest = () => {
  const { guest, guestAttending, setAttending, guestMeal, setMeal } = useContext(RsvpContext);

  return (
    <div className="guest-view">
      <h3>Hey {guest.post_title}!</h3>

      <p>We hope that you'll be able to make it to celebrate with us.</p>
      <p>So, can you make it?</p>

      <ul>
        <li>
          <label>
            <span>I'll be there! <span role="img" aria-label="whoop">🎉</span></span>
            <input type="radio" value="yes" name="attendee_status" checked={guestAttending === 'yes'} onChange={() => setAttending('yes')} />
          </label>
        </li>
        <li>
          <label>
          Unfortunately I can't make it <span role="img" aria-label="sad face">☹</span>
            <input type="radio" value="no" name="attendee_status" checked={guestAttending === 'no'} onChange={() => setAttending('no')} />
          </label>
        </li>
      </ul>

      {guestAttending === 'yes' && (
        <div>
          <p>Awesome! What'll you have to eat?</p>

          <form>
            <ul>
              {mealOptions.map(meal => (
                <li key={meal.key}>
                  <label>
                    <span>{meal.label}</span>
                    <input type="radio" value={meal.key} name="attendee_meal" checked={guestMeal === meal.key} onChange={() => setMeal(meal.key)} />
                  </label>
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}

      {guestAttending === 'no' && (
        <p>We're so sorry we'll miss you.</p>
      )}
    </div>
  );

};

export default Guest;
