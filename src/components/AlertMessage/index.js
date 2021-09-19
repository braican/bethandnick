import React from 'react';
import PropTypes from 'prop-types';

import styles from './AlertMessage.module.scss';

const AlertMessage = ({ children }) => <p className={styles.alert}>{children}</p>;

AlertMessage.propTypes = {
  children: PropTypes.node,
};
export default AlertMessage;
