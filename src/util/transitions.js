
export const duration = 300;

export const transitionStyles = {
  entering: {
    overflow: 'hidden',
    width: 0,
    height: 0,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${duration}ms cubic-bezier(0.55, 0.085, 0.68, 0.53)`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${duration / 2}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    opacity: 0,
  },
};
