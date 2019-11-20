import React, { useContext } from 'react';
import { RsvpContext } from '../index';

import { getFirstName, className } from '../../../util';

import styles from './SetAttending.module.scss';

const SetAttending = () => {
  const { next, previous, guest, group, updateGuestRsvp, getGuestAttending } = useContext(
    RsvpContext
  );
  const otherGuests = group.guests.filter(otherGuest => otherGuest.id !== guest.id);
  const currGuestAttending = getGuestAttending(guest.id);

  /**
   * Set the attending status. Note that since this is the first input for a guest, we need to add
   * all of the guest info to the RSVP object.
   *
   * @param {object} guest The guest we're setting stuff for.
   * @param {object} event Event from the input change.
   */
  const setGuestCanGo = (guest, event = null) => {
    const newGuest = { ...guest };

    if (null === event || event.target.checked) {
      newGuest.attending = true;
    } else {
      newGuest.attending = null;
    }

    updateGuestRsvp(guest.id, newGuest);

  };

  const setGuestDeclines = (guest, event = null) => {
    const newGuest = { ...guest };

    if (null === event || event.target.checked) {
      newGuest.attending = false;
    } else {
      newGuest.attending = null;
    }

    updateGuestRsvp(guest.id, newGuest);
  };

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
        <div className={styles.setOtherAttending}>
          <p>Would you like to check in for anyone else from {group.street}?</p>

          <ul>
            {otherGuests.map(otherGuest => (
              <li key={otherGuest.id} className={styles.otherGuestListItem}>
                <span className={styles.otherGuestName}>{otherGuest.name}</span>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name={`attendee_status_${otherGuest.id}`}
                      checked={true === getGuestAttending(otherGuest.id)}
                      onChange={event => setGuestCanGo(otherGuest, event)}
                    />
                    <span {...className(styles.otherGuestChoice, styles.otherGuestChoice__yes)}>Can attend</span>
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name={`attendee_status_${otherGuest.id}`}
                      checked={false === getGuestAttending(otherGuest.id)}
                      onChange={event => setGuestDeclines(otherGuest, event)}
                    />
                    <span {...className(styles.otherGuestChoice, styles.otherGuestChoice__no)}>Declines</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.actions}>

        <button className="btn" disabled={null === getGuestAttending(guest.id)} onClick={next}>
        Next
        </button>
        <button className="btn--secondary" onClick={previous}>Back</button>
      </div>
    </div>
  );
};

export default SetAttending;
