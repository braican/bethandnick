import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from '../index';

import styles from './SearchResults.module.scss';

const Welcome = ({ results }) => {
  if (results.length > 1) {
    return <p>We've got more than one group of people who have a similar address...who are you?</p>;
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

const SearchResults = () => {
  const { next, setGuest, setGroup, searchResults } = useContext(RsvpContext);
  let allResponded = false;

  const handleChooseGuest = (guest, group) => {
    setGuest(guest);
    setGroup(group);
    next();
  };

  return (
    <div className="rsvp--search-results">
      <Welcome results={searchResults} />

      {searchResults.map(group => (
        <div key={group.id} className={styles.group}>
          <p className={styles.address}>{group.address}</p>

          <ul className={styles.guestList}>
            {group.guests.map(guest => {
              const guestResponded = guest.attending < 0 || guest.attending;
              if (guestResponded) {
                allResponded = true;
              }

              return (
                <li key={guest.id} className={styles.guestListItem}>
                  {guestResponded > 0 ? (
                    <span>{guest.name} {guest.attending < 0 ? 'has declined' : 'will be there'}</span>
                  ) : (
                    <button onClick={() => handleChooseGuest(guest, group)} className={styles.guestButton}>
                      {guest.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {allResponded && (
        <p>If anything above looks wrong, please contact Nick or Beth as soon as possible so we can make it right.</p>
      )}
    </div>
  );
};

export default SearchResults;
