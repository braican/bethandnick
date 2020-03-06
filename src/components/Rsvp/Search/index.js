import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { RsvpContext } from '../index';
import { catchApiError } from '../../../util';

import styles from './Search.module.scss';
import trsStyles from '../../../styles/transitions/fade.module.scss';

const Search = () => {
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const { next, setSearchResults } = useContext(RsvpContext);
  const searchboxContainer = useRef();

  useEffect(() => {
    if (searchboxContainer && searchboxContainer.current) {
      const height = searchboxContainer.current.offsetHeight;
      searchboxContainer.current.style.minHeight = `${height}px`;
    }
  }, []);

  const handleSearch = event => {
    event.preventDefault();

    if (search.length <= 3) {
      setErrorMessage('Your search query needs to be at least four characters long.');
      return;
    }

    setLoading(true);

    axios.get(`/.netlify/functions/search`, {
      params: { search },
    })
      .then( ({ data }) => {
        if (data.code && data.code === 'no_results') {
          setErrorMessage(data.message);
          return;
        }

        setHasResults(true);
        setSearchResults(data);
        next();
      })
      .catch(err => {
        catchApiError(err);
        setErrorMessage('Something went wrong. Please contact Nick or Beth to RSVP.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="view--search">
      <p className="big">
        We're excited to celebrate with you in October. To verify your invitation, please
        enter the address we sent your invitation to below (you only need the street number and name):
      </p>

      <div ref={searchboxContainer}>

        <SwitchTransition>
          <CSSTransition
            key={loading || hasResults ? 'loading' : 'not-loading'}
            timeout={300}
            classNames={{ ...trsStyles }}
          >
            {(loading || hasResults) ? (
              <p>Searching....</p>
            ) : (
              <form onSubmit={handleSearch}>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <input
                  className={styles.searchField}
                  type="text"
                  name="street_name"
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                  placeholder="101 Main Street"
                  autoComplete="off"
                />
                <button className="btn btn--primary" disabled={search === ''}>Search</button>
              </form>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>

    </div>
  );
};

export default Search;
