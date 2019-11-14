import React, { useContext } from 'react';
import { RsvpContext } from '../index';

const SetAttending = () => {
  const { next, guest, group, updateGuestRsvp, getGuestAttending } = useContext(RsvpContext);
  const otherGuests = group.guests.filter(otherGuest => otherGuest.ID !== guest.ID);

  const setGuestCanGo = guest => {
    updateGuestRsvp(guest.ID, { ...guest, attending: true });
  };

  const setGuestDeclines = guest => {
    updateGuestRsvp(guest.ID, { ...guest, attending: false });
  };

  return (
    <div className="rsvp--set-attending">
      <h3>Hey {guest.post_title}!</h3>

      <p>We hope that you'll be able to make it to celebrate with us.</p>

      <ul>
        <li>
          <label>
            <span>I'll be there! <span role="img" aria-label="whoop">🎉</span></span>
            <input type="radio" name="attendee_status" checked={true === getGuestAttending(guest.ID)} onChange={() => setGuestCanGo(guest)} />
          </label>
        </li>
        <li>
          <label>
            <span>Unfortunately I can't make it <span role="img" aria-label="sad face">☹</span></span>
            <input type="radio" name="attendee_status" checked={false === getGuestAttending(guest.ID)} onChange={() => setGuestDeclines(guest)} />
          </label>
        </li>
      </ul>

      {otherGuests.length > 0 && (
        <div>
          <p>Would you like to check anyone else in from {group.address}?</p>

          <ul>
            {otherGuests.map(otherGuest => (
              <li key={otherGuest.ID}>
                {otherGuest.post_title}

                <label>
                  <span>Can attend</span>
                  <input type="radio" name={`attendee_status_${otherGuest.ID}`} checked={true === getGuestAttending(otherGuest.ID)} onChange={() => setGuestCanGo(otherGuest)} />
                </label>

                <label>
                  <span>Declines</span>
                  <input type="radio" name={`attendee_status_${otherGuest.ID}`} checked={false === getGuestAttending(otherGuest.ID)} onChange={() => setGuestDeclines(otherGuest)} />
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn" disabled={null === getGuestAttending(guest.ID)} onClick={next}>Next</button>
    </div>
  );

};

export default SetAttending;
