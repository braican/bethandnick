import React from 'react';
import PropTypes from 'prop-types';

import { className } from '../../../util';

import CloseIcon from '../../../svg/close.svg';
import styles from './Close.module.scss';

const CloseButton = ({ onClick, className: classFromProps }) => (
  <button {...className(styles.button, classFromProps)} onClick={onClick}>
    <CloseIcon />
  </button>
);

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

CloseButton.defaultProps = {
  onClick: null,
  className: null,
};

export default CloseButton;
