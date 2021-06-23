import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, Button, Typography } from '@material-ui/core';
import { putErrorMessage } from '../../../store/auth/actions';
import { useStyles } from '../constants';

interface Props {
  errorText: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  setBackdropView: Dispatch<SetStateAction<boolean>>;
}

const ErrorModal: React.FC<Props> = ({ errorText, isOpen, setModalView, setBackdropView }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const upperErrorText = errorText.toUpperCase();

  const handleClose = () => {
    setBackdropView(false);
    setModalView(false);
    dispatch(putErrorMessage({ message: '' }));
  };

  return (
    <Dialog open={isOpen} onEscapeKeyDown={handleClose} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="inherit" noWrap color="error">
          {`Error: ${upperErrorText}`}
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} classes={{ root: classes.errorButton }} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
