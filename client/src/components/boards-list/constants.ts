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
    maxHeight: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export { useStyles };
