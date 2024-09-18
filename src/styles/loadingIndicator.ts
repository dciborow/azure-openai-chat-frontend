import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  spinner: {
    width: 'var(--d-large)',
    height: '30px',
    fill: 'var(--c-accent-light)',
    animation: 'spinneranimation 1s linear infinite',
    marginRight: '10px',
  },
  '@keyframes spinneranimation': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});

export default useStyles;
