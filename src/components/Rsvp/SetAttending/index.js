import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { RsvpContext } from '../index';

import { getFirstName, className } from '../../../util';

import styles from './SetAttending.module.scss';
import trsStyles from './transition.module.scss';

const SetAttending = () => {

  const { next, previous, guest, group, updateGuestRsvp, getGuestAttending } = useContext(
    RsvpContext
  );

  const otherGuests = group.guests.filter(otherGuest => otherGuest.id !== guest.id);
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
      setCurrentGuestSelected(true);
      newGuest.attending = true;
      updateGuestRsvp(guest.id, newGuest);
    } else {
      updateGuestRsvp(guest.id, null);
    }
  };

  const setGuestDeclines = (guest, event = null) => {
    const newGuest = { ...guest };

    if (null === event || event.target.checked) {
      setCurrentGuestSelected(true);
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
      <p className={styles.guestName}>Hey {getFirstName(guest.name)}!</p>

      <p>We hope that you'll be able to make it to celebrate with us. Choose whether or not you can attend below.</p>

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
              <span className={styles.happyEmoji} role="img" aria-label="whoop">
              🎉
              </span>
              &nbsp;I'll be there!&nbsp;
              <span className={styles.happyEmoji} role="img" aria-label="whoop">
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
            Unfortunately I can't make it
          </label>
        </li>
      </ul>

      <CSSTransition
        in={otherGuests.length > 0 && currentGuestSelected}
        timeout={300}
        classNames={{ ...trsStyles }}
        unmountOnExit
      >
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
      </CSSTransition>


      <div className={styles.actions}>
        {currentGuestSelected &&  <button className="btn btn--primary" onClick={next}>Next</button>}
        <button className="btn--secondary" onClick={goBack}>Back</button>
      </div>

    </div>
  );
};

export default SetAttending;
