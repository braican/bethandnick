import React, { useContext } from 'react';
import { SearchContext } from './index';
import { RsvpContext } from '../index';

const RsvpSearchResults = () => {
  const { groups } = useContext(SearchContext);
  const { setGuest, setView } = useContext(RsvpContext);

  const handleChooseGuest = guest => {
    setGuest(guest);
    setView('guest');
  };

  return (
    <div className="search-results">
      <p>Who are you?</p>

      {groups.map(group => (
        <div key={group.ID}>
          <p>{group.address}</p>

          <ul>
            {group.guests.map(guest => (
              <li key={guest.ID}><button onClick={() => handleChooseGuest(guest)}>{guest.post_title}</button></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RsvpSearchResults;
