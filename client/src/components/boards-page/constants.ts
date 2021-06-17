import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  boardsContainer: {
    backgroundColor: theme.palette.primary.contrastText,
    minHeight: '40vh',
    marginTop: '5%',
    padding: '30px',
    boxSizing: 'border-box'
  },
  boardName: {
    maxHeight: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  editBoardNameButton: {
    width: '22px !important',
    height: '22px !important',
    minHeight: 'unset !important'
  },
  dialogTitle: {
    textAlign: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  autocompleteRoot: {
    width: '260px'
  }
}));

export { useStyles };
