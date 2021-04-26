import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: { backgroundColor: theme.palette.secondary.light },
  iconButt: { color: theme.palette.primary.contrastText },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export { useStyles };
