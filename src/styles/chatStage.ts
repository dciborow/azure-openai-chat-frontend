import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  chatStageHeader: {
    display: 'flex',
    width: 'var(--width-base)',
    margin: '0 auto var(--d-large)',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (min-width: 1024px)': {
      width: 'var(--width-narrow)',
    },
  },
  chatStageLink: {
    flexShrink: 0,
    borderRadius: 'calc(var(--radius-large) * 3)',
    border: 'var(--border-thicker) solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    backgroundSize: 'cover',
    backgroundImage: 'linear-gradient(to right, var(--c-accent-light), var(--c-accent-high))',
    width: 'calc(var(--d-xlarge) * 2)',
    height: 'calc(var(--d-xlarge) * 2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'var(--d-large)',
    overflow: 'hidden',
    padding: 'var(--d-small)',
    position: 'relative',
    '&::after': {
      content: '""',
      borderRadius: 'calc(var(--radius-large) * 3)',
      width: 'calc(var(--width-base) - var(--d-small))',
      height: 'calc(var(--width-base) - var(--d-small))',
      position: 'absolute',
      backgroundColor: 'var(--c-secondary)',
    },
  },
  chatStageLinkSvg: {
    width: 'calc(var(--width-base) - var(--d-small))',
    height: 'calc(var(--width-base) - var(--d-small))',
    position: 'relative',
    zIndex: 1,
  },
});

export default useStyles;
