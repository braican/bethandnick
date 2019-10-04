import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, Transition } from 'react-transition-group';

import Nav from './TeamNav';
import Person from '../Person';

import styles from './Team.module.scss';

export const TeamContext = React.createContext();

export const timeout = 300;

const getTransitionStyles = {
  entering: {
    overflow: 'hidden',
    width: 0,
    height: 0,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms cubic-bezier(0.55, 0.085, 0.68, 0.53)`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout / 2}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    opacity: 0,
  },
};

const Team = ({ girls, guys, family }) => {
  const [group, setGroup] = useState([]);
  const [activeGroup, setActiveGroup] = useState('girls');
  const scrollAnchor = useRef();

  useEffect(() => {
    if (activeGroup === 'girls') {
      setGroup(girls);
    } else if (activeGroup === 'guys') {
      setGroup(guys);
    } else if (activeGroup === 'family') {
      setGroup(family);
    }

    if (scrollAnchor && scrollAnchor.current) {
      setTimeout(() => {
        document.querySelector(`#${scrollAnchor.current.id}`).scrollIntoView({
          behavior: 'smooth',
        });
      }, timeout);
    }

  }, [activeGroup]);

  return (
    <div className={styles.theTeam}>
      <TeamContext.Provider value={{ activeGroup, setActiveGroup }}>
        <Nav top />

        <span className={styles.scrollAnchor} ref={scrollAnchor} id="scroll-anchor"></span>

        {group && group.length > 0 && (
          <TransitionGroup>
            {group.map(person => (
              <Transition
                key={person.name}
                timeout={{
                  enter: timeout,
                  exit: timeout,
                }}>
                {status => <div style={{ ...getTransitionStyles[status] }}><Person key={person.name} person={person} /></div>}
              </Transition>
            ))}

          </TransitionGroup>
        )}

        <Nav />
      </TeamContext.Provider>
    </div>
  );
};

Team.propTypes = {
  girls: PropTypes.array,
  guys: PropTypes.array,
  family: PropTypes.array,
};

Team.defaultProps = {
  girls: [],
  guys: [],
  family: [],
};

export default Team;
