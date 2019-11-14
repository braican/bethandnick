import React, { useContext, useState } from 'react';
import axios from 'axios';
import { RsvpContext } from '../index';
import { catchApiError } from '../../../util';

const Search = () => {
  const [street, setStreet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const { next, setSearchResults } = useContext(RsvpContext);

  const handleStreetSearch = event => {
    event.preventDefault();
    setLoading(true);

    axios.get(`https://bethandnick.ups.dock/wp-json/guestlist/v1/search?event=142&s_addr=${street}`)
      .then( ({ data }) => {
        if (data.code && data.code === 'no_results') {
          setErrorMessage(data.message);
          return;
        }

        setHasResults(true);
        setSearchResults(data);
        next();
      })
      .catch(catchApiError)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="view--search">
      <p>
        We're excited to celebrate with you in October. To verify your invitation, please
        enter the address we sent your invitation to below:
      </p>

      {(loading || hasResults) ? (
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
          <button className="btn" disabled={street === ''}>Search</button>
        </form>
      )}
    </div>
  );
};

export default Search;
