import React, { useContext, useState } from 'react';
import { RsvpContext } from '../index';
import { getFirstName, className } from '../../../util';

import styles from './SetAttending.module.scss';

const SetAttending = () => {
  const { next, previous, guest, group, updateGuestRsvp, getGuestAttending } =
    useContext(RsvpContext);

  const otherGuests = group.guests.filter(
    (otherGuest) => otherGuest.id !== guest.id && otherGuest.attending === null
  );
  const currGuestAttending = getGuestAttending(guest.id);

  const [currentGuestSelected, setCurrentGuestSelected] = useState(currGuestAttending !== null);

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
      updateGuestRsvp(guest.id, newGuest);
    } else {
      updateGuestRsvp(guest.id, null);
    }
  };

  const setGuestDeclines = (guest, event = null) => {
    const newGuest = { ...guest };

    if (null === event || event.target.checked) {
      newGuest.attending = false;
      updateGuestRsvp(guest.id, newGuest);
    } else {
      updateGuestRsvp(guest.id, null);
    }
  };

  const goBack = () => {
    updateGuestRsvp(guest.id, { attending: null });
    previous();
  };

  return (
    <div className={`rsvp--set-attending ${currGuestAttending !== null ? styles.guestChosen : ''}`}>
      <h3 className={styles.guestName}>Hey {getFirstName(guest.name)}!</h3>

      <p className="big">
        We hope that you'll be able to make it to Groton on December 18th to celebrate with us.
        Choose whether or not you can attend below.
      </p>

      <ul className={styles.attendingChoices}>
        <li className={styles.choice}>
          <input
            type="radio"
            name="attendee_status"
            id="attendee_status_yes"
            checked={true === currGuestAttending}
            onChange={() => {
              setCurrentGuestSelected(true);
              setGuestCanGo(guest);
            }}
          />
          <label
            {...className(styles.currentGuestOption, styles.currentGuestOption__yes)}
            htmlFor="attendee_status_yes"
          >
            <p className={styles.inner}>
              <span className={styles.happyEmoji} role="img" aria-label="whoop">
                🎉
              </span>
              &nbsp;I'll be there!&nbsp;
              <span className={styles.happyEmoji} role="img" aria-label="whoop">
                🎉
              </span>
            </p>
          </label>
        </li>

        <li className={styles.choice}>
          <input
            type="radio"
            name="attendee_status"
            id="attendee_status_no"
            checked={false === currGuestAttending}
            onChange={() => {
              setCurrentGuestSelected(true);
              setGuestDeclines(guest);
            }}
          />
          <label
            {...className(styles.currentGuestOption, styles.currentGuestOption__no)}
            htmlFor="attendee_status_no"
          >
            <p className={styles.inner}>Sorry, I can't make&nbsp;it</p>
          </label>
        </li>
      </ul>

      {otherGuests.length > 0 && (
        <div className={styles.setOtherAttending}>
          <p>Are you checking anyone else in&nbsp;today?</p>

          <ul>
            {otherGuests.map((otherGuest) => (
              <li key={otherGuest.id} className={styles.otherGuestListItem}>
                <span className={styles.otherGuestName}>{otherGuest.name}</span>

                <div className={styles.otherGuestStatus}>
                  <label className={styles.otherGuestLabel}>
                    <input
                      type="checkbox"
                      name={`attendee_status_${otherGuest.id}`}
                      checked={true === getGuestAttending(otherGuest.id)}
                      onChange={(event) => setGuestCanGo(otherGuest, event)}
                    />
                    <span {...className(styles.otherGuestChoice, styles.otherGuestChoice__yes)}>
                      Can&nbsp;attend
                    </span>
                  </label>

                  <label className={styles.otherGuestLabel}>
                    <input
                      type="checkbox"
                      name={`attendee_status_${otherGuest.id}`}
                      checked={false === getGuestAttending(otherGuest.id)}
                      onChange={(event) => setGuestDeclines(otherGuest, event)}
                    />
                    <span {...className(styles.otherGuestChoice, styles.otherGuestChoice__no)}>
                      Declines
                    </span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.actions}>
        <button className="btn btn--primary" onClick={next} disabled={!currentGuestSelected}>
          Next
        </button>
        <button className="btn--secondary" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default SetAttending;
