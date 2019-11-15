import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';


const ConfirmYes = ({ guest, meal }) => (
  <div>
    <p>Excellent! Don't forget to mark your calendar for October 17th of this year, we can't wait to celebrate with you.</p>
    {guest.name}
    {meal}
  </div>
);

ConfirmYes.propTypes = {
  guest: PropTypes.object.isRequired,
  meal: PropTypes.string,
};

const ConfirmNo = () => (
  <p>We're sorry you can't make it!</p>
);

const Confirm = () => {
  const { guest, getGuestAttending, getGuestMeal, getOtherGuests } = useContext(RsvpContext);
  const otherGuests = getOtherGuests();

  return (
    <div className="rsvp--confirm">
      {true === getGuestAttending(guest.id) ? <ConfirmYes guest={guest} meal={getGuestMeal(guest.id)} /> : <ConfirmNo />}

      {otherGuests && (
        <div>
          <p>You've also checked in these guests:</p>

          <ul>
            {Object.keys(otherGuests).map(guestId => {
              const otherGuest = otherGuests[guestId];
              return (
                <li key={guestId}>
                  {otherGuest.name}

                  {otherGuest.meal}
                  {otherGuest.attending ? 'Yes' : 'No'}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p>If everything looks good, hit submit below to complete your RSVP.</p>

      <button className="btn">Submit</button>
    </div>
  );

};

export default Confirm;
