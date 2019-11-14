import React, { useContext } from 'react';
import { RsvpContext } from '../index';


const ConfirmYes = () => (
  <div>
    <p>Excellent. Just make sure everything below is correct and hit submit to complete your RSVP! And don't forget to mark your calendar for October 17th of this year!</p>

  </div>
);

const ConfirmNo = () => (
  <p>Oh no! We'll miss you at the party.</p>
);

const Confirm = () => {
  const { attending, meal, guest } = useContext(RsvpContext);

  return (
    <div className="rsvp--confirm">
      {true === attending ? <ConfirmYes guest={guest} meal={meal} /> : <ConfirmNo />}
    </div>
  );

};

export default Confirm;
