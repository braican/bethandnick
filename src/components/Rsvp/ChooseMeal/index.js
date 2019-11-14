import React, { useContext } from 'react';
import { RsvpContext } from '../index';

import mealOptions from '../_data/meals';

const ChooseMeal = () => {
  const { next, meal, setMeal } = useContext(RsvpContext);

  return (
    <div className="rsvp--choose-meal">
      <p>Awesome! We're so excited that you'll be able to attend. What do you think you'd like to eat at the wedding?</p>

      <ul>
        {mealOptions.map(({ key, label }) => (
          <li key={key}>
            <label>
              {label}
              <input type="radio" name="attendee_meal" value={label} checked={meal === label} onChange={() => setMeal(label)} />
            </label>
          </li>
        ))}
      </ul>

      <button className="btn" disabled={!meal} onClick={next}>Next</button>
    </div>
  );

};

export default ChooseMeal;
