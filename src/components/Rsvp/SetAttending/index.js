import React, { useContext } from 'react';
import { RsvpContext } from '../index';

const SetAttending = () => {
  const { next, guest, group, updateGuestRsvp, getGuestAttending } = useContext(RsvpContext);
  const otherGuests = group.guests.filter(otherGuest => otherGuest.id !== guest.id);

  const setGuestCanGo = guest => {
    updateGuestRsvp(guest.id, { ...guest, attending: true });
  };

  const setGuestDeclines = guest => {
    updateGuestRsvp(guest.id, { ...guest, attending: false });
  };

  return (
    <div className="rsvp--set-attending">
      <h3>Hey {guest.name}!</h3>

      <p>We hope that you'll be able to make it to celebrate with us.</p>

      <ul>
        <li>
          <label>
            <span>I'll be there! <span role="img" aria-label="whoop">🎉</span></span>
            <input type="radio" name="attendee_status" checked={true === getGuestAttending(guest.id)} onChange={() => setGuestCanGo(guest)} />
          </label>
        </li>
        <li>
          <label>
            <span>Unfortunately I can't make it <span role="img" aria-label="sad face">☹</span></span>
            <input type="radio" name="attendee_status" checked={false === getGuestAttending(guest.id)} onChange={() => setGuestDeclines(guest)} />
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
                  <input type="radio" name={`attendee_status_${otherGuest.id}`} checked={true === getGuestAttending(otherGuest.id)} onChange={() => setGuestCanGo(otherGuest)} />
                </label>

                <label>
                  <span>Declines</span>
                  <input type="radio" name={`attendee_status_${otherGuest.id}`} checked={false === getGuestAttending(otherGuest.id)} onChange={() => setGuestDeclines(otherGuest)} />
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn" disabled={null === getGuestAttending(guest.id)} onClick={next}>Next</button>
    </div>
  );

};

export default SetAttending;
