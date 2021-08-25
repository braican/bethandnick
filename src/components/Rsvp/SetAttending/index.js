import React, { useContext, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { RsvpContext } from '../index';
import { getFirstName, className } from '../../../util';

import styles from './SetAttending.module.scss';
import trsStyles from '../../../styles/transitions/fade.module.scss';

const SetAttending = () => {
  const { next, previous, guest, group, updateGuestRsvp, getGuestAttending } =
    useContext(RsvpContext);

  const guestGuestNameInput = useRef();

  const otherGuests = group.guests.filter(
    (otherGuest) =>
      otherGuest.id !== guest.id && otherGuest.attending === null && otherGuest.name !== 'Guest'
  );

  const guestGuest = group.guests.filter(
    (otherGuest) =>
      otherGuest.id !== guest.id && otherGuest.attending === null && otherGuest.name === 'Guest'
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

      {guestGuest.length > 0 && (
        <div>
          <CSSTransition
            unmountOnExit
            in={true === currGuestAttending}
            timeout={300}
            classNames={{ ...trsStyles }}
          >
            <div className={styles.otherGuestListItem}>
              <p>Will you be bringing a guest?</p>

              <div className={styles.otherGuestStatus}>
                <label className={styles.otherGuestLabel}>
                  <input
                    type="radio"
                    name={`attendee_status_${guestGuest[0].id}`}
                    checked={true === getGuestAttending(guestGuest[0].id)}
                    onChange={(event) => setGuestCanGo(guestGuest[0], event)}
                  />
                  <span {...className(styles.otherGuestChoice, styles.otherGuestChoice__yes)}>
                    Yep
                  </span>
                </label>

                <label className={styles.otherGuestLabel}>
                  <input
                    type="radio"
                    name={`attendee_status_${guestGuest[0].id}`}
                    checked={false === getGuestAttending(guestGuest[0].id)}
                    onChange={(event) => setGuestDeclines(guestGuest[0], event)}
                  />
                  <span {...className(styles.otherGuestChoice, styles.otherGuestChoice__no)}>
                    Nope
                  </span>
                </label>
              </div>
            </div>
          </CSSTransition>

          <CSSTransition
            unmountOnExit
            in={true === getGuestAttending(guestGuest[0].id)}
            timeout={300}
            classNames={{ ...trsStyles }}
            onEnter={() => {
              if (guestGuestNameInput && guestGuestNameInput.current) {
                guestGuestNameInput.current.focus();
              }
            }}
          >
            <div className={styles.otherGuestListItem}>
              <p>Great! What's their name?</p>

              <div className={styles.otherGuestStatus}>
                <input
                  ref={guestGuestNameInput}
                  className={styles.otherGuestNameInput}
                  type="text"
                  placeholder="Xander Bogaerts"
                  onChange={(event) =>
                    updateGuestRsvp(guestGuest[0].id, { name: event.target.value })
                  }
                />
              </div>
            </div>
          </CSSTransition>
        </div>
      )}

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
