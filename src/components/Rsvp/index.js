import React, { useState } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { duration, transitionStyles } from '../../util/transitions';

import Search from './Search';
import Guest from './Guest';

export const RsvpContext = React.createContext();

const Rsvp = () => {
  const [guest, setGuest] = useState(null);
  const [guestAttending, setAttending] = useState(null);
  const [guestMeal, setMeal] = useState(null);
  const [view, setView] = useState('search');

  return (
    <RsvpContext.Provider
      value={{ setView, setGuest, guest, setAttending, guestAttending, guestMeal, setMeal }}
    >
      <div className="rsvp">
        <h1 className="h1">Welcome to the party</h1>

        <TransitionGroup>
          <Transition key={`rsvp-view-${view}`} timeout={duration}>
            {status => (
              <div style={{ ...transitionStyles[status] }}>
                {view === 'search' && <Search />}
                {view === 'guest' && <Guest />}
              </div>
            )}
          </Transition>
        </TransitionGroup>
      </div>
    </RsvpContext.Provider>
  );
};

export default Rsvp;
