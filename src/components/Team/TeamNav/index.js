import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import bridesmaidIcon from '../../../svg/bridesmaid.svg';
import groomsmanIcon from '../../../svg/groomsman.svg';
import familyIcon from '../../../svg/family.svg';

import { TeamContext } from '../index';

import { className } from '../../../util';

import styles from './TeamNav.module.scss';

const TeamNav = ({ top }) => {
  const { activeGroup, setActiveGroup } = useContext(TeamContext);

  return (
    <div {...className(styles.nav, top && styles.navTop)}>
      <button {...className(styles.button, activeGroup === 'girls' && styles.active)} onClick={() => setActiveGroup('girls')}>
        <svg><use xlinkHref={`#${bridesmaidIcon.id}`} /></svg>
        <span>Bridesmaids</span>
      </button>
      <button {...className(styles.button, activeGroup === 'guys' && styles.active)} onClick={() => setActiveGroup('guys')}>
        <svg><use xlinkHref={`#${groomsmanIcon.id}`} /></svg>
        <span>Groomsmen</span>
      </button>
      <button {...className(styles.button, activeGroup === 'family' && styles.active)} onClick={() => setActiveGroup('family')}>
        <svg><use xlinkHref={`#${familyIcon.id}`} /></svg>
        <span>Families</span>
      </button>
    </div>
  );
};

TeamNav.propTypes = {
  top: PropTypes.bool,
};

TeamNav.defaultProps = {
  top: false,
};


export default TeamNav;
