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
  const otherGuests = getOtherGuests();

  const saveRsvp = () => {
    setLoading(true);

    axios
      .post(`/.netlify/functions/submit`, { rsvps })
      .then(next)
      .catch(({ response }) => {
        console.error(response);
      });
  };

  return (
    <div className="rsvp--confirm">
      <CurrentGuestConfirmation guest={guest} />

      {otherGuests && (
        <div className={styles.otherGuests}>
          <p>The following guests will also be checked in:</p>

          <ul>
            {Object.keys(otherGuests).map(guestId => (
              <li key={guestId}>
                <OtherGuestConfirmation guest={otherGuests[guestId]} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <p>If everything looks good, hit Confirm below to complete your RSVP.</p>

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
