import React, { useContext } from 'react';
import { RsvpContext } from '../index';

import Welcome from './Welcome';
import Result from './GroupResult';

const SearchResults = () => {
  const { searchResults } = useContext(RsvpContext);

  return (
    <div className="rsvp--search-results">

      {searchResults && (
        <>
          <Welcome results={searchResults} />
          {searchResults.map(result => <Result key={result.id} group={result} />)}
        </>
      )}
    </div>
  );
};

export default SearchResults;
