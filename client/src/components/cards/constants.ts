import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  descriptionText: {
    minHeight: '80px',
    fontSize: '15px'
  },
  descriptionTextarea: {
    padding: '10px 10px',
    minHeight: '80px !important',
    fontSize: '15px',
    resize: 'none',
    boxSizing: 'border-box'
  },
  cardName: {
    fontSize: '20px',
    fontWeight: 'bold',
    paddingTop: '5px',
    paddingBottom: '5px',
    minHeight: '30px'
  },
  dialogActions: {
    justifyContent: 'space-between'
  },
  columnNameButton: {
    padding: '0',
    textDecoration: 'underline',
    textTransform: 'none',
    paddingLeft: '5px',
    minWidth: 'unset',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      backgroundColor: 'unset'
    }
  }
}));

export { useStyles };
