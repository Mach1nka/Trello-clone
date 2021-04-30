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
    position: 'absolute',
    bottom: '10px',
    right: '5px',
    width: '20px',
    height: '20px',
    minHeight: 'unset'
  }
}));

export { useStyles };
