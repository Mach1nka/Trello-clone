import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: { backgroundColor: theme.palette.secondary.light },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export { useStyles };
