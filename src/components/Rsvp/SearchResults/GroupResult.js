import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';

import Arrow from '../../../svg/arrow-right';
import styles from './SearchResults.module.scss';

const GroupResult = ({ group }) => {
  const { address, guests } = group;
  const { next, setGuest, setGroup } = useContext(RsvpContext);

  const respondedGuests = [];
  const activeGuests = guests.filter(guest => {
    if (guest.attending !== null) {
      respondedGuests.push(guest);
      return false;
    }

    return true;
  });

  const handleChooseGuest = (guest, group) => {
    setGuest(guest);
    setGroup(group);
    next();
  };

  return (
    <div className={styles.group}>
      <p className={styles.address}>{address}</p>

      {activeGuests.length > 0 && (
        <ul className={styles.guestList}>
          {activeGuests.map(guest => (
            <li key={guest.id} className={styles.guestListItem}>
              <button
                onClick={() => handleChooseGuest(guest, group)}
                className={styles.guestButton}
              >
                <span>{guest.name}</span><span className={styles.icon}>&nbsp;<span className={styles.guestArrow}><Arrow /></span></span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {respondedGuests.length > 0 && (
        <div className={styles.respondedGuests}>
          <p className={styles.respondedGuests__intro}>
            {activeGuests.length > 0 ? <>The following guests have been checked&nbsp;in:</> : <>Looks like everyone from this address is checked&nbsp;in.</>}
          </p>
          <ul className={styles.respondedGuestList}>
            {respondedGuests.map(guest => (
              <li key={guest.id} className={guest.attending < 0 ? styles.respondedGuestDeclined : styles.respondedGuestAttending}>
                <span className={styles.respondedGuestStrong}>{guest.name}</span> {guest.attending < 0 ? 'has declined' : 'will be attending'}
              </li>
            ))}
          </ul>

          <p className={styles.contactText}>
            If anything above looks wrong, please contact Nick or Beth as soon as possible so we can
            make it right.
          </p>
        </div>
      )}
    </div>
  );
};

GroupResult.propTypes = {
  group: PropTypes.shape({
    address: PropTypes.string,
    guests: PropTypes.array,
  }),
};

export default GroupResult;
