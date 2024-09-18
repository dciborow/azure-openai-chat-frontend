import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  subheadlineSmall: {
    fontSize: '12px',
    display: 'inline-block',
  },
  itemsList: {
    borderTop: 'none',
    padding: '0 var(--d-base)',
    margin: 'var(--d-small) 0',
    display: 'block',
  },
  itemsListItem: {
    display: 'inline-block',
    backgroundColor: 'var(--c-accent-light)',
    borderRadius: 'var(--radius-small)',
    textDecoration: 'none',
    padding: 'var(--d-xsmall)',
    marginTop: '5px',
    fontSize: 'var(--font-small)',
    '&.active': {
      backgroundColor: 'var(--c-accent-high)',
    },
    '&:not(:first-child)': {
      marginLeft: '5px',
    },
  },
  itemsLink: {
    textDecoration: 'none',
    color: 'var(--text-color)',
    '&.active': {
      color: 'var(--c-white)',
    },
  },
});

export default useStyles;
