import React, { useState } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { duration, transitionStyles } from '../../util/transitions';

import Search from './Search';
import SearchResults from './SearchResults';
import SetAttending from './SetAttending';
import ChooseMeal from './ChooseMeal';
import Confirm from './Confirm';

export const RsvpContext = React.createContext();

const views = [
  {
    // 0
    name: 'search',
    component: Search,
  },
  {
    // 1
    name: 'search-results',
    component: SearchResults,
  },
  {
    // 2
    name: 'set-attending',
    component: SetAttending,
  },
  {
    // 3
    name: 'choose-meal',
    component: ChooseMeal,
  },
  {
    // 4
    name: 'confirm',
    component: Confirm,
  },
];

const Rsvp = () => {
  const [guest, setGuest] = useState(null);
  const [group, setGroup] = useState(null);
  const [attending, setAttending] = useState(null);
  const [meal, setMeal] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [rsvpStep, setRsvpStep] = useState(0);

  const { name: viewName, component: View } = views[rsvpStep];

  const next = () => {
    let nextStep = rsvpStep + 1;

    if ('set-attending' === viewName && false === attending) {
      nextStep += 1;
    }

    setRsvpStep(nextStep);
  };

  return (
    <RsvpContext.Provider
      value={{
        next,

        guest,
        setGuest,

        group,
        setGroup,

        attending,
        setAttending,

        meal,
        setMeal,

        searchResults,
        setSearchResults,
      }}
    >
      <div className="rsvp">
        <h1 className="h1">Welcome to the party</h1>

        <TransitionGroup>
          <Transition key={`rsvp-view-${viewName}`} timeout={duration}>
            {status => <div style={{ ...transitionStyles[status] }}><View /></div>}
          </Transition>
        </TransitionGroup>
      </div>
    </RsvpContext.Provider>
  );
};

export default Rsvp;
