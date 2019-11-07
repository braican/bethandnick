import React, { useContext, useState } from 'react';
import axios from 'axios';
import { catchApiError } from '../../../util';
import { SearchContext } from './index';

const RsvpSearchForm = () => {
  const [street, setStreet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setHasGroups, setGroups, hasGroups } = useContext(SearchContext);

  const handleStreetSearch = event => {
    event.preventDefault();
    setLoading(true);

    axios.get(`https://bethandnick.ups.dock/wp-json/guestlist/v1/search?event=142&s_addr=${street}`)
      .then( ({ data }) => {
        if (data.code && data.code === 'no_results') {
          setErrorMessage(data.message);
          return;
        }

        setHasGroups(true);
        setGroups(data);
      })
      .catch(catchApiError)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="search-form">
      <p>
        We're excited to celebrate with you in October. To verify your invitation, please
        enter the address we sent your invitation to below:
      </p>

      {(loading || hasGroups) ? (
        <p>Searching....</p>
      ) : (
        <form onSubmit={handleStreetSearch}>
          {errorMessage && <p>{errorMessage}</p>}
          <input
            type="text"
            name="street_name"
            onChange={e => setStreet(e.target.value)}
            value={street}
          />
          <button>Search</button>
        </form>
      )}


    </div>
  );
};

export default RsvpSearchForm;
