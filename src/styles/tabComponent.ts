import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  tabComponentList: {
    listStyleType: 'none',
    display: 'flex',
    boxShadow: 'var(--shadow)',
    borderRadius: 'var(--radius-base)',
    padding: 'var(--d-xsmall)',
    width: '450px',
    margin: '0 auto',
    justifyContent: 'space-evenly',
  },
  tabComponentListItem: {
    width: '33%',
    textAlign: 'center',
  },
  tabComponentLinkActive: {
    background: 'linear-gradient(to left, var(--c-accent-light), var(--c-accent-high))',
    color: 'var(--c-white)',
  },
  tabComponentLink: {
    borderBottom: '4px solid transparent',
    borderRadius: 'var(--radius-small)',
    textDecoration: 'none',
    color: 'var(--text-color)',
    fontWeight: 'bold',
    fontSize: 'var(--font-small)',
    cursor: 'pointer',
    display: 'block',
    padding: 'var(--d-small)',
    '&:hover': {
      background: 'var(--c-light-gray)',
      cursor: 'pointer',
    },
  },
  tabComponentContent: {
    position: 'relative',
  },
  tabComponentTab: {
    position: 'absolute',
    top: 0,
    left: '30px',
    display: 'none',
    width: '100%',
    '@media (max-width: 1024px)': {
      position: 'relative',
      left: 0,
    },
  },
  tabComponentTabActive: {
    display: 'block',
  },
});

export default useStyles;
