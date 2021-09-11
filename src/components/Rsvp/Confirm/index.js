import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { RsvpContext } from '../index';

import CurrentGuestConfirmation from './CurrentGuestConfirmation';
import OtherGuestConfirmation from './OtherGuestConfirmation';

import trsStyles from '../../../styles/transitions/fadeDown.module.scss';
import styles from './Confirm.module.scss';

const Confirm = () => {
  const { guest, getOtherGuests, previous, next, rsvps } = useContext(RsvpContext);
  const [loading, setLoading] = useState(false);
  const [optedEmail, setOptedEmail] = useState('');
  const otherGuests = getOtherGuests();
  const otherGuestIds = Object.keys(otherGuests).filter(
    (k) => otherGuests[k].name !== 'Guest' || otherGuests[k].attending === true
  );

  const saveRsvp = () => {
    setLoading(true);
    axios
      .post(`/.netlify/functions/submit`, { rsvps, activeGuestId: guest.id, optedEmail })
      .then(next)
      .catch(({ response }) => {
        console.error(response);
      });
  };

  return (
    <div className="rsvp--confirm">
      <CurrentGuestConfirmation guest={guest} />

      {otherGuestIds.length > 0 && (
        <div className={styles.otherGuests}>
          <p>You're also submitting {otherGuestIds.length > 1 ? 'RSVPs ' : 'an RSVP '} for:</p>

          <ul>
            {otherGuestIds.map((guestId) => (
              <li key={guestId}>
                <OtherGuestConfirmation guest={otherGuests[guestId]} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <p>
        If everything looks good, hit Confirm below to complete your&nbsp;RSVP. You can also enter
        your email address below to receive a confirmation email.
      </p>

      <input
        type="email"
        size="30"
        value={optedEmail}
        onChange={(event) => setOptedEmail(event.target.value)}
        className={styles.optInEmailInput}
        placeholder="Email address"
      />

      <div className={styles.actions}>
        <SwitchTransition>
          <CSSTransition
            key={loading ? 'loading' : 'not-loading'}
            timeout={300}
            classNames={{ ...trsStyles }}
          >
            {loading ? (
              <p>Hold on while we save your rsvp...</p>
            ) : (
              <div>
                <button className="btn btn--primary" onClick={saveRsvp}>
                  Confirm
                </button>
                <button className="btn--secondary" onClick={previous}>
                  Back
                </button>
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default Confirm;
