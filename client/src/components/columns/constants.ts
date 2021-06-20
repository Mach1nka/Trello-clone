import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  columnName: {
    display: 'block',
    fontSize: '19px',
    fontWeight: 400,
    maxWidth: '190px',
    overflowWrap: 'break-word'
  },
  submitButton: {
    backgroundColor: 'rgba(240, 125, 57, 0.85)',
    '&:hover': {
      backgroundColor: theme.palette.warning.main
    }
  }
}));

export { useStyles };
