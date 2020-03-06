import React from 'react';
import PropTypes from 'prop-types';

const OtherGuestConfirmation = ({ guest: { attending, name, meal, restrictions } }) => (
  <p>
    <strong className="heavy">{name}</strong>{' '}
    {attending ? (
      <>
        will be attending, and will have the {meal.toLowerCase()} meal&nbsp;option.
        {restrictions
          ? ` They have the following dietary restrictions: ${restrictions}.`
          : ''}
      </>
    ) : (
      'is unable to attend.'
    )}
  </p>
);

OtherGuestConfirmation.propTypes = {
  guest: PropTypes.shape({
    attending: PropTypes.bool,
    name: PropTypes.string.isRequired,
    meal: PropTypes.string.isRequired,
    restrictions: PropTypes.string,
  }).isRequired,
};

export default OtherGuestConfirmation;
