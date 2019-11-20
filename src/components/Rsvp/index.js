import React, { useState } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';

import Search from './Search';
import SearchResults from './SearchResults';
import SetAttending from './SetAttending';
import ChooseMeal from './ChooseMeal';
import Confirm from './Confirm';

export const RsvpContext = React.createContext();

const duration = 300;

const transitionStyles = {
  entering: {
    overflow: 'hidden',
    width: 0,
    height: 0,
    opacity: 0,
    transform: 'translateX(20px)',
  },
  entered: {
    transition: `all ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`,
    opacity: 1,
    transform: 'translateX(0)',
  },
  exiting: {
    transition: `all ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`,
    opacity: 0,
    transform: 'translateX(-20px)',
  },
};

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
  const [searchResults, setSearchResults] = useState([]);
  const [guest, setGuest] = useState(null);
  const [group, setGroup] = useState(null);
  const [rsvps, setRsvps] = useState({});
  const [rsvpStep, setRsvpStep] = useState(0);
  const { name: viewName, component: View } = views[rsvpStep];

  const yesGuestCount = () => Object.keys(rsvps).filter(guestId => rsvps[guestId].attending === true).length;

  const next = () => {
    let nextStep = rsvpStep + 1;

    if ('set-attending' === viewName && yesGuestCount() === 0) {
      nextStep += 1;
    }

    setRsvpStep(nextStep);
  };

  const previous = () => {
    const prevStep = rsvpStep - 1;
    setRsvpStep(prevStep);
  };

  const updateGuestRsvp = (guestId, data) => {
    const newRsvps = { ...rsvps };
    const guestResponses = { ...newRsvps[guestId], ...data };

    newRsvps[guestId] = guestResponses;
    setRsvps(newRsvps);
  };

  const getGuestAttending = guestId => rsvps[guestId] ? rsvps[guestId].attending : null;
  const getGuestMeal = guestId => rsvps[guestId] ? rsvps[guestId].meal : null;
  const getOtherGuests = (onlyAttending = false) => {
    const otherGuestIds = Object.keys(rsvps).filter(guestId => {
      const isNotCurrentGuest = parseInt(guestId) !== parseInt(guest.id);

      if (onlyAttending) {
        return isNotCurrentGuest && rsvps[guestId].attending === true;
      }

      return isNotCurrentGuest;
    });

    if (otherGuestIds.length === 0) {
      return false;
    }

    const otherGuests = {};
    otherGuestIds.forEach(guestId => {
      otherGuests[guestId] = rsvps[guestId];
    });

    return otherGuests;
  };

  return (
    <RsvpContext.Provider
      value={{
        next,
        previous,

        guest,
        setGuest,

        group,
        setGroup,

        rsvps,
        updateGuestRsvp,

        getGuestAttending,
        getGuestMeal,
        getOtherGuests,

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
