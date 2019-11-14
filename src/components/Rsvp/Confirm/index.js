import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';


const ConfirmYes = ({ guest, meal }) => (
  <div>
    <p>Excellent. Just make sure everything below is correct and hit submit to complete your RSVP! And don't forget to mark your calendar for October 17th of this year!</p>

  </div>
);

ConfirmYes.propTypes = {
  guest: PropTypes.object.isRequired,
  meal: PropTypes.string,
};

const ConfirmNo = () => (
  <p>Oh no! We'll miss you at the party.</p>
);

const Confirm = () => {
  const { attending, meal, guest, group } = useContext(RsvpContext);
  const otherGuests = group.guests.filter(altGuest => altGuest.ID !== guest.ID);

  return (
    <div className="rsvp--confirm">
      {true === attending ? <ConfirmYes guest={guest} meal={meal} /> : <ConfirmNo />}

      {otherGuests.length > 0 && (
        <div>
          <p>Would you like to RSVP for anyone else from {group.address}?</p>

          <ul>
            {otherGuests.map(altGuest => (
              <li key={altGuest.ID}>{altGuest.post_title}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn">Complete my RSVP</button>
    </div>
  );

};

export default Confirm;
