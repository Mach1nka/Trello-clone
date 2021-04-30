import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
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
  }
}));

export { useStyles };
