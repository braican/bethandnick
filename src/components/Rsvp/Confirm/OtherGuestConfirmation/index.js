import React from 'react';
import PropTypes from 'prop-types';

import { className } from '../../../../util';

import styles from './OtherGuestConfirmation.module.scss';

const OtherGuestConfirmation = ({ guest: { attending, name, meal, restrictions } }) => (
  <div {...className(styles.guest, attending ? styles.statusAttending : styles.statusDeclined)}>

    <p className={styles.guestName}>{name}</p>{' '}

    {attending ? (
      <div>
        <p>Will be attending!</p>
        <p>Will be having the <strong>{meal.toLowerCase()}</strong> meal&nbsp;option for dinner.</p>
        {restrictions && <p>Has the following dietary restrictions: {restrictions}.</p>}
      </div>
    ) : (
      <div>is unable to attend.</div>
    )}
  </div>
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
