import React, { useContext } from 'react';
import { RsvpContext } from '../index';

const SetAttending = () => {
  const { next, guest, attending, setAttending } = useContext(RsvpContext);

  return (
    <div className="rsvp--set-attending">
      <h3>Hey {guest.post_title}!</h3>

      <p>We hope that you'll be able to make it to celebrate with us.</p>
      <p>So, can you make it?</p>

      <ul>
        <li>
          <label>
            <span>I'll be there! <span role="img" aria-label="whoop">🎉</span></span>
            <input type="radio" value="yes" name="attendee_status" checked={true === attending} onChange={() => setAttending(true)} />
          </label>
        </li>
        <li>
          <label>
            <span>Unfortunately I can't make it <span role="img" aria-label="sad face">☹</span></span>
            <input type="radio" value="no" name="attendee_status" checked={false === attending} onChange={() => setAttending(false)} />
          </label>
        </li>
      </ul>

      <button className="btn" disabled={null === attending} onClick={next}>Next</button>
    </div>
  );

};

export default SetAttending;
