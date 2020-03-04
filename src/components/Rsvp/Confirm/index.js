import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { RsvpContext } from '../index';
import { getFirstName } from '../../../util';

import trsStyles from '../../../styles/transitions/fadeDown.module.scss';
import styles from './Confirm.module.scss';

/**
 * Checks to see if a user input indicates no restriction based on some whitelisted words.
 *
 * @param {string} input The restriction text the user added to the text field.
 *
 * @return boolean
 */
const indicatesNoRestriction = input => {
  const noWords = ['none', 'nope', 'no', 'no restrictions', 'no restriction'];
  return noWords.indexOf(input) > -1;
};

const Confirm = () => {
  const {
    guest,
    getGuestAttending,
    getGuestMeal,
    getGuestRestrictions,
    getOtherGuests,
    previous,
    next,
    rsvps,
  } = useContext(RsvpContext);

  const [loading, setLoading] = useState(false);

  const otherGuests = getOtherGuests();

  const saveRsvp = () => {
    setLoading(true);

    axios.post('https://bethandnick.ups.dock/wp-json/guestlist/v1/update', { rsvps })
      .then(() => {
        next();
      })
      .catch(({ response }) => {
        console.error(response);
      });
  };

  const currentGuestConfirm = () => {
    const attending = getGuestAttending(guest.id);
    const name = getFirstName(guest.name);
    const meal = getGuestMeal(guest.id);
    const restrictions = getGuestRestrictions(guest.id);

    return (
      <div className={styles.currentGuest}>
        <p className={styles.currentStatus}>
          OK {name}, let's just confirm:{' '}
          {true === attending
            ? <>you <strong>will be attending the wedding</strong> <span className={styles.happyEmoji} role="img" aria-label="whoop">🎉</span>, and you'll be having the <strong>{meal.toLowerCase()}</strong> meal option (great choice).</>
            : <><strong>you are unable to attend</strong> <span className={styles.sadEmoji} role="img" aria-label="sad">😞</span>.</>
          }
        </p>

        {attending && restrictions && (
          <p>
            {indicatesNoRestriction(restrictions.toLowerCase()) ? 'You\'ve also indicated that you have no dietary restrictions.' : `You've also indicated the following dietary restriction: ${restrictions}.`}
          </p>
        )}
      </div>
    );
  };

  const otherGuestConfirm = guestId => {
    const { name, attending, meal, restrictions } = otherGuests[guestId];

    return (
      <li key={guestId}>
        <p>
          <strong className="heavy">{name}</strong>{' '}
          {attending ? (
            <>
              will be attending, and will have the {meal.toLowerCase()} meal&nbsp;option.
              {restrictions
                ? ` They have the following dietary restrictions: ${restrictions}.`
                : ''}
            </>
          ) : (
            'is unable to attend.'
          )}
        </p>
      </li>
    );
  };

  return (
    <div className="rsvp--confirm">
      {currentGuestConfirm()}

      {otherGuests && (
        <div className={styles.otherGuests}>
          <p>The following guests will also be checked in:</p>

          <ul>{Object.keys(otherGuests).map(otherGuestConfirm)}</ul>
        </div>
      )}

      <p>If everything looks good, hit Confirm below to complete your RSVP.</p>


      <button onClick={() => setLoading(!loading)}>Toggle</button>

      <div className={styles.actions}>

        <SwitchTransition>
          <CSSTransition
            key={loading ? 'loading' : 'not-loading'}
            timeout={300}
            classNames={{ ...trsStyles }}
          >
            {loading ? (
              <p>One sec while we save your rsvp...</p>
            ) : (
              <div>
                <button className="btn btn--primary" onClick={saveRsvp}>Confirm</button>
                <button className='btn--secondary' onClick={previous}>Back</button>
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>

      </div>
    </div>
  );
};

export default Confirm;
