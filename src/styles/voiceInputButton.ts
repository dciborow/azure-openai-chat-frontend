import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  button: {
    color: 'var(--text-color)',
    fontWeight: 'bold',
    marginLeft: '8px',
    background: 'transparent',
    transition: 'background 0.3s ease-in-out',
    boxShadow: 'none',
    border: 'none',
    cursor: 'pointer',
    width: 'var(--d-xlarge)',
    height: '100%',
    '&:hover, &:focus': {
      background: 'var(--c-secondary)',
    },
    '&:hover svg, &:focus svg': {
      opacity: 0.8,
    },
  },
  notRecording: {
    '& svg': {
      fill: 'var(--c-black)',
    },
  },
  recording: {
    '& svg': {
      fill: 'var(--red)',
    },
  },
});

export default useStyles;
