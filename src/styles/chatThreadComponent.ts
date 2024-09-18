import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    ul: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '@keyframes chatmessageanimation': {
      '0%': {
        opacity: 0.5,
        top: '150px',
      },
      '100%': {
        opacity: 1,
        top: 0,
      },
    },
    chatHeaderButton: {
      display: 'flex',
      alignItems: 'center',
    },
    chatHeader: {
      display: 'flex',
      alignItems: 'top',
      justifyContent: 'flex-end',
      padding: 'var(--d-base)',
    },
    chatHeaderButton: {
      marginRight: 'var(--d-base)',
    },
    chatList: {
      color: 'var(--text-color)',
      display: 'flex',
      flexDirection: 'column',
      listStylePosition: 'inside',
      paddingInlineStart: 0,
    },
    chatFooter: {
      width: '100%',
      height: 'calc(var(--d-large) + var(--d-base))',
    },
    chatListItem: {
      maxWidth: 'var(--width-wide)',
      minWidth: 'var(--width-base)',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      '@media (min-width: 768px)': {
        maxWidth: '55%',
        minWidth: 'var(--width-narrow)',
      },
    },
    chatTxt: {
      animation: 'chatmessageanimation 0.5s ease-in-out',
      backgroundColor: 'var(--c-secondary)',
      color: 'var(--text-color)',
      borderRadius: 'var(--radius-base)',
      marginTop: '8px',
      wordWrap: 'break-word',
      marginBlockEnd: 0,
      position: 'relative',
      boxShadow: 'var(--shadow)',
      border: 'var(--border-thin) solid var(--c-light-gray)',
    },
    chatTxtError: {
      border: 'var(--border-base) solid var(--error-color)',
      color: 'var(--error-color)',
      padding: 'var(--d-base)',
      background: 'var(--c-error-background)',
    },
    chatTxtUserMessage: {
      background: 'linear-gradient(to left, var(--c-accent-dark), var(--c-accent-high))',
      color: 'var(--c-white)',
      border: 'var(--border-thin) solid var(--c-accent-light)',
    },
    chatListItemUserMessage: {
      alignSelf: 'flex-end',
    },
    chatTxtEntry: {
      padding: '0 var(--d-base)',
    },
    chatTxtInfo: {
      fontSize: 'smaller',
      fontStyle: 'italic',
      margin: 0,
      marginTop: 'var(--border-thin)',
    },
    userMessageChatTxtInfo: {
      textAlign: 'right',
    },
    itemsListWrapper: {
      borderTop: 'var(--border-thin) solid var(--c-light-gray)',
      display: 'grid',
      padding: '0 var(--d-base)',
      gridTemplateColumns: '1fr 18fr',
    },
    itemsListWrapperSvg: {
      fill: 'var(--c-accent-high)',
      width: 'var(--d-large)',
      margin: 'var(--d-large) auto',
    },
    svg: {
      height: 'auto',
      fill: 'var(--text-color)',
    },
    itemsListFollowup: {
      display: 'flex',
      flexDirection: 'row',
      padding: 'var(--d-base)',
      listStyleType: 'none',
      flexWrap: 'wrap',
    },
    itemsListSteps: {
      padding: '0 var(--d-base) 0 var(--d-xlarge)',
      listStyleType: 'disc',
    },
    chatCitations: {
      borderTop: 'var(--border-thin) solid var(--c-light-gray)',
    },
    itemsList: {
      margin: 'var(--d-small) 0',
      display: 'block',
      padding: '0 var(--d-base)',
    },
    itemsListItemFollowup: {
      cursor: 'pointer',
      padding: '0 var(--d-xsmall)',
      borderRadius: 'var(--radius-base)',
      border: 'var(--border-thin) solid var(--c-accent-high)',
      margin: 'var(--d-xsmall)',
      transition: 'background-color 0.3s ease-in-out',
      '&:hover, &:focus': {
        backgroundColor: 'var(--c-accent-light)',
        cursor: 'pointer',
      },
    },
    itemsLink: {
      textDecoration: 'none',
      color: 'var(--text-color)',
    },
    stepsItemsListItemStep: {
      padding: 'var(--d-xsmall) 0',
      fontSize: 'var(--font-base)',
      lineHeight: 1,
    },
    followupItemsLink: {
      color: 'var(--c-accent-high)',
      display: 'block',
      padding: 'var(--d-xsmall) 0',
      borderBottom: 'var(--border-thin) solid var(--c-light-gray)',
      fontSize: 'var(--font-small)',
    },
    citation: {
      backgroundColor: 'var(--c-accent-light)',
      borderRadius: '3px',
      padding: 'calc(var(--d-small) / 5)',
      marginLeft: '3px',
    },
  },
});

export default useStyles;
