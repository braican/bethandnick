import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';


const ConfirmYes = ({ guest, meal }) => (
  <div>
    <p>Excellent. Just make sure everything below is correct and hit submit to complete your RSVP! And don't forget to mark your calendar for October 17th of this year!</p>
    {guest.post_title}
    {meal}
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
  const { guest, getGuestAttending, getGuestMeal, getOtherGuests } = useContext(RsvpContext);
  const otherGuests = getOtherGuests();

  return (
    <div className="rsvp--confirm">
      {true === getGuestAttending(guest.ID) ? <ConfirmYes guest={guest} meal={getGuestMeal(guest.ID)} /> : <ConfirmNo />}

      {otherGuests && (
        <div>
          <p>You've also checked in these guests:</p>

          <ul>
            {Object.keys(otherGuests).map(guestId => {
              const otherGuest = otherGuests[guestId];
              return (
                <li key={guestId}>
                  {otherGuest.post_title}

                  {otherGuest.meal}
                  {otherGuest.attending ? 'Yes' : 'No'}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button className="btn">Submit</button>
    </div>
  );

};

export default Confirm;
