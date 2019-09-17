import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const OptionalLink = ({ to, when, children }) => {
  if (to !== '' && when) {
    return <Link to={to}>{children}</Link>;
  }

  return children;
};

OptionalLink.propTypes = {
  to: PropTypes.string,
  when: PropTypes.bool,
  children: PropTypes.node,
};

OptionalLink.defaultProps = {
  to: '',
  when: false,
  children: null,
};

export default OptionalLink;
