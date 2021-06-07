import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  descriptionText: {
    minHeight: '100px',
    fontSize: '14px'
  },
  cardName: {
    fontSize: '20px',
    fontWeight: 'bold',
    paddingTop: '5px',
    paddingBottom: '5px',
    minHeight: '30px'
  }
}));

export { useStyles };
