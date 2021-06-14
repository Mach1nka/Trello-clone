import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  columnName: {
    display: 'block',
    fontSize: '19px',
    fontWeight: 400,
    maxWidth: '190px',
    overflowWrap: 'break-word'
  }
}));

export { useStyles };
