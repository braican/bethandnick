import React from 'react';
import PropTypes from 'prop-types';

import { className } from '../../../util';

import hamburgerIcon from '../../../svg/hamburger.svg';
import styles from './MenuToggle.module.scss';

const MenuButton = ({ onClick, className: classFromProps }) => (
  <button {...className(styles.button, classFromProps)} onClick={onClick}>
    <span className={styles.label}>Menu</span>
    <span className={styles.icon}>
      <svg>
        <use xlinkHref={`#${hamburgerIcon.id}`} />
      </svg>
    </span>
  </button>
);

MenuButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

MenuButton.defaultProps = {
  onClick: null,
  className: null,
};

export default MenuButton;
