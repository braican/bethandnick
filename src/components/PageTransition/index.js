import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, Transition } from 'react-transition-group';

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

const PageTransition = ({ children, location }) => (
  <TransitionGroup>
    <Transition
      key={location.pathname}
      timeout={{
        enter: timeout,
        exit: timeout,
      }}>
      {status => <div style={{ ...getTransitionStyles[status] }}>{children}</div>}
    </Transition>
  </TransitionGroup>
);

PageTransition.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default PageTransition;
