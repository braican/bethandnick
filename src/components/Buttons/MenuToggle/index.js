import React from 'react';
import PropTypes from 'prop-types';

import { className } from '../../../util';

import HamburgerIcon from '../../../svg/hamburger.svg';
import styles from './MenuToggle.module.scss';

const MenuButton = ({ onClick, pathname, className: classFromProps }) => (
  <button
    {...className(styles.button, classFromProps, pathname === '/' && styles.buttonLighter)}
    onClick={onClick}
  >
    <span className={styles.label}>Menu</span>
    <span className={styles.icon}>
      <HamburgerIcon />
    </span>
  </button>
);

MenuButton.propTypes = {
  location: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

MenuButton.defaultProps = {
  onClick: null,
  className: null,
};

export default MenuButton;
