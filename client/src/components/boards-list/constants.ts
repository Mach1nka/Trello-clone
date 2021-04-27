import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: theme.palette.primary.contrastText,
    height: '50vh',
    marginTop: '5%',
    padding: '30px',
    boxSizing: 'border-box'
  }
}));

export { useStyles };
