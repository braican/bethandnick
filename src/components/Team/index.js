import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, Transition } from 'react-transition-group';
import { duration, transitionStyles } from '../../util/transitions';

import Nav from './TeamNav';
import Person from '../Person';

import styles from './Team.module.scss';

export const TeamContext = React.createContext();

const Team = ({ girls, guys, family, officiant }) => {
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
    } else if (activeGroup === 'officiant') {
      setGroup(officiant);
    }

    if (scrollAnchor && scrollAnchor.current) {
      setTimeout(() => {
        document.querySelector(`#${scrollAnchor.current.id}`).scrollIntoView({
          behavior: 'smooth',
        });
      }, 400);
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
              <Transition key={person.name} timeout={duration} >
                {status => <div style={{ ...transitionStyles[status] }}><Person key={person.name} person={person} /></div>}
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
  officiant: PropTypes.array,
};

Team.defaultProps = {
  girls: [],
  guys: [],
  family: [],
};

export default Team;
