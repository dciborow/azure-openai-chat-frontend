import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  button: {
    color: 'var(--text-color)',
    textDecoration: 'underline',
    border: 'var(--border-thin) solid var(--c-accent-dark)',
    textDecoration: 'none',
    borderRadius: 'var(--radius-small)',
    background: 'var(--c-white)',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
    opacity: 1,
    padding: 'var(--d-xsmall)',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '&:hover > span, &:focus > span': {
      display: 'inline-block',
      opacity: 1,
    },
    '&:hover, &:focus, &:hover > svg, &:focus > svg': {
      backgroundColor: 'var(--c-light-gray)',
      borderRadius: 'var(--radius-small)',
      transition: 'background 0.3s ease-in-out',
    },
  },
  span: {
    fontSize: 'smaller',
    transition: 'all 0.3s ease-out 0s',
    position: 'absolute',
    textAlign: 'right',
    top: '-80%',
    background: 'var(--c-accent-dark)',
    color: 'var(--c-white)',
    opacity: 0,
    right: 0,
    padding: 'var(--d-xsmall) var(--d-small)',
    borderRadius: 'var(--radius-small)',
    fontWeight: 'bold',
    wordWrap: 'nowrap',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: 'var(--border-thick) solid var(--c-accent-dark)',
      bottom: '-8px',
      right: '5px',
    },
  },
  svg: {
    fill: 'currentColor',
    padding: 'var(--d-xsmall)',
    width: 'var(--d-base)',
    height: 'var(--d-base)',
  },
});

export default useStyles;
