import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import BridesmaidIcon from '../../../svg/bridesmaid.svg';
import GroomsmanIcon from '../../../svg/groomsman.svg';
import FamilyIcon from '../../../svg/family.svg';
import OfficiantIcon from '../../../svg/officiant.svg';

import { TeamContext } from '../index';

import { className } from '../../../util';

import styles from './TeamNav.module.scss';

const TeamNav = ({ top }) => {
  const { activeGroup, setActiveGroup } = useContext(TeamContext);

  return (
    <div {...className(styles.nav, top && styles.navTop)}>
      <button
        {...className(styles.button, activeGroup === 'girls' && styles.active)}
        onClick={() => setActiveGroup('girls')}
      >
        <BridesmaidIcon />
        <span>Bridesmaids</span>
      </button>
      <button
        {...className(styles.button, activeGroup === 'guys' && styles.active)}
        onClick={() => setActiveGroup('guys')}
      >
        <GroomsmanIcon />
        <span>Groomsmen</span>
      </button>
      <button
        {...className(styles.button, activeGroup === 'family' && styles.active)}
        onClick={() => setActiveGroup('family')}
      >
        <FamilyIcon />
        <span>Families</span>
      </button>
      <button
        {...className(styles.button, activeGroup === 'officiant' && styles.active)}
        onClick={() => setActiveGroup('officiant')}
      >
        <OfficiantIcon />
        <span>Officiant</span>
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
