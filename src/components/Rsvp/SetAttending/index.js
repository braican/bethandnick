import React, { useContext } from 'react';
import { RsvpContext } from '../index';

import { getFirstName } from '../../../util';

import styles from './SetAttending.module.scss';

const SetAttending = () => {
  const { next, previous, guest, group, updateGuestRsvp, getGuestAttending } = useContext(
    RsvpContext
  );
  const otherGuests = group.guests.filter(otherGuest => otherGuest.id !== guest.id);
  const currGuestAttending = getGuestAttending(guest.id);

  const setGuestCanGo = guest => {
    updateGuestRsvp(guest.id, { ...guest, attending: true });
  };

  const setGuestDeclines = guest => {
    updateGuestRsvp(guest.id, { ...guest, attending: false });
  };

  console.log(getGuestAttending());


  return (
    <div className={`rsvp--set-attending ${currGuestAttending !== null ? styles.guestChosen : ''}`}>
      <p>Hey {getFirstName(guest.name)}!</p>

      <p>We hope that you'll be able to make it to celebrate with us.</p>

      <ul className={styles.attendingChoices}>
        <li className={styles.choice}>
          <input
            type="radio"
            name="attendee_status"
            id="attendee_status_yes"
            checked={true === currGuestAttending}
            onChange={() => setGuestCanGo(guest)}
          />
          <label className={styles.currentGuestOption} htmlFor="attendee_status_yes">
            <span>
            I'll be there!&nbsp;
              <span role="img" aria-label="whoop">
              🎉
              </span>
            </span>
          </label>
        </li>
        <li className={styles.choice}>
          <input
            type="radio"
            name="attendee_status"
            id="attendee_status_no"
            checked={false === currGuestAttending}
            onChange={() => setGuestDeclines(guest)}
          />
          <label className={styles.currentGuestOption} htmlFor="attendee_status_no">
            <span>
            Unfortunately I can't make it&nbsp;
              <span role="img" aria-label="sad face">
              ☹
              </span>
            </span>
          </label>
        </li>
      </ul>

      {otherGuests.length > 0 && (
        <div>
          <p>Would you like to check anyone else in from {group.street}?</p>

          <ul>
            {otherGuests.map(otherGuest => (
              <li key={otherGuest.id}>
                {otherGuest.name}

                <label>
                  <span>Can attend</span>
                  <input
                    type="radio"
                    name={`attendee_status_${otherGuest.id}`}
                    checked={true === getGuestAttending(otherGuest.id)}
                    onChange={() => setGuestCanGo(otherGuest)}
                  />
                </label>

                <label>
                  <span>Declines</span>
                  <input
                    type="radio"
                    name={`attendee_status_${otherGuest.id}`}
                    checked={false === getGuestAttending(otherGuest.id)}
                    onChange={() => setGuestDeclines(otherGuest)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn" disabled={null === getGuestAttending(guest.id)} onClick={next}>
        Next
      </button>
      <button onClick={previous}>Back</button>
    </div>
  );
};

export default SetAttending;
