import React, { useState } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { duration, transitionStyles } from '../../../util/transitions';
import Form from './Form';
import Results from './Results';

export const SearchContext = React.createContext();

const RsvpSearch = () => {
  const [ hasGroups, setHasGroups ] = useState(false);
  const [ groups, setGroups ] = useState([]);

  return (
    <SearchContext.Provider value={{ hasGroups, setHasGroups, groups, setGroups }}>
      <TransitionGroup>
        <Transition key={`rsvp-search-${hasGroups ? 'results' : 'search'}`} timeout={duration}>
          {status => (
            <div style={{ ...transitionStyles[status] }}>
              {hasGroups ? <Results /> : <Form />}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </SearchContext.Provider>
  );
};

export default RsvpSearch;
