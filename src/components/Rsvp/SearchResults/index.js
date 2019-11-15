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
        <div key={group.id}>
          <p>{group.address}</p>

          <ul>
            {group.guests.map(guest => (
              <li key={guest.id}><button onClick={() => handleChooseGuest(guest, group)}>{guest.name}</button></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
