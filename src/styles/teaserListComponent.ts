import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  headline: {
    color: 'var(--text-color)',
    fontSize: 'var(--font-r-large)',
    padding: 0,
    margin: 'var(--d-small) 0 var(--d-large)',
    '@media (min-width: 1024px)': {
      fontSize: 'var(--font-r-base)',
      textAlign: 'center',
    },
  },
  button: {
    textDecoration: 'none',
    color: 'var(--text-color)',
    display: 'block',
    fontSize: 'var(--font-rel-base)',
  },
  teaserList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&.always-row': {
      textAlign: 'left',
    },
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
    },
  },
  teaserListItem: {
    padding: 'var(--d-small)',
    borderRadius: 'var(--radius-base)',
    background: 'var(--c-white)',
    margin: 'var(--d-xsmall)',
    color: 'var(--text-color)',
    justifyContent: 'space-evenly',
    boxShadow: 'var(--shadow)',
    border: 'var(--border-base) solid transparent',
    '@media (min-width: 768px)': {
      minHeight: '100px',
    },
    '&:hover, &:focus': {
      color: 'var(--c-accent-dark)',
      background: 'var(--c-secondary)',
      transition: 'all 0.3s ease-in-out',
      borderColor: 'var(--c-accent-high)',
    },
  },
  teaserClickLabel: {
    color: 'var(--c-accent-high)',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '20px',
    textDecoration: 'underline',
  },
});

export default useStyles;
