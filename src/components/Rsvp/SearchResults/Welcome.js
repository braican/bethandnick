import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ results }) => {
  if (results.length > 1) {
    return <p className="big">We're inviting a few people who have a similar address. Please select your name below.</p>;
  }

  if (results.length === 0) {
    return null;
  }

  const unansweredGuests = results[0].guests.filter(guest => !(guest.attending > 0 || guest.attending < 0));

  if (unansweredGuests.length === 0) {
    return <p>It looks like you've already rsvp'd!</p>;
  }

  return <p>We think we found you! Who are we talking to here?</p>;
};

Welcome.propTypes = {
  results: PropTypes.array,
};

export default Welcome;
