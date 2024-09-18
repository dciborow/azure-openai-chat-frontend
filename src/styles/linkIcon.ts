import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  linkIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '8px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    backgroundSize: 'cover',
    backgroundImage: 'linear-gradient(to right, #f6d5f2, #692b61)',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    padding: '10px',
    position: 'relative',
  },
  svgIcon: {
    width: 'calc(80% - 10px)',
    height: 'calc(80% - 10px)',
    position: 'relative',
    zIndex: 1,
  },
  after: {
    content: '""',
    borderRadius: '50%',
    width: 'calc(80% - 10px)',
    height: 'calc(80% - 10px)',
    position: 'absolute',
    backgroundColor: '#f5f5f5',
  },
});

export default useStyles;
