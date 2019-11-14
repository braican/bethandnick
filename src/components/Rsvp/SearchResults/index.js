import React, { useContext } from 'react';
import { RsvpContext } from '../index';

const SearchResults = () => {
  const { next, setGuest, setGroup, searchResults } = useContext(RsvpContext);

  const handleChooseGuest = (guest, group) => {
    setGuest(guest);
    setGroup(group);
    next();
  };

  return (
    <div className="rsvp--search-results">
      <p>Who are you?</p>

      {searchResults.map(group => (
        <div key={group.ID}>
          <p>{group.address}</p>

          <ul>
            {group.guests.map(guest => (
              <li key={guest.ID}><button onClick={() => handleChooseGuest(guest, group)}>{guest.post_title}</button></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
