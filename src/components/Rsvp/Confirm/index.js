import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';

const ConfirmYes = ({ meal, restrictions }) => (
  <div>
    <p>
      Excellent! Don't forget to mark your calendar for October 17th of this year, we can't wait to
      celebrate with you.
    </p>

    <p>
      You've selected {meal} for your meal and you've indicated{' '}
      {restrictions ? `the following restrictions: ${restrictions}.` : 'no restrictions.'}
    </p>
  </div>
);

ConfirmYes.propTypes = {
  meal: PropTypes.string,
  restrictions: PropTypes.string,
};

const ConfirmNo = () => <p>Oh no! We're sorry that you're unable to make it!</p>;

const Confirm = () => {
  const {
    guest,
    getGuestAttending,
    getGuestMeal,
    getGuestRestrictions,
    getOtherGuests,
  } = useContext(RsvpContext);

  const otherGuests = getOtherGuests();

  return (
    <div className="rsvp--confirm">
      {true === getGuestAttending(guest.id) ? (
        <ConfirmYes
          meal={getGuestMeal(guest.id)}
          restrictions={getGuestRestrictions(guest.id)}
        />
      ) : (
        <ConfirmNo />
      )}

      {otherGuests && (
        <div>
          <p>You've also checked in these guests:</p>

          <ul>
            {Object.keys(otherGuests).map(guestId => {
              const otherGuest = otherGuests[guestId];
              return (
                <li key={guestId}>
                  <strong>{otherGuest.name}</strong><br/>
                  {otherGuest.attending && <><span>{otherGuest.meal}</span><br/></>}
                  {otherGuest.attending ? 'Yes' : 'No'} <br/>
                  {otherGuest.restrictions || ''}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p>If everything looks good, hit submit below to complete your RSVP.</p>

      <button className="btn btn--primary">Submit</button>
    </div>
  );
};

export default Confirm;
