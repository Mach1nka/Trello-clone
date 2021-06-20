import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: { backgroundColor: theme.palette.secondary.main },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  boardName: { color: '#fcf1c2' },
  navButton: {
    backgroundColor: '#fcf1c2',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: 'rgba(252, 241, 194, 0.8)'
    }
  }
}));

export { useStyles };
