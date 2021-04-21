import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, Button, Typography } from '@material-ui/core';
import { putErrorMessage } from '../../store/auth/actions';

interface Props {
  errorText: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const ErrorModal: React.FC<Props> = ({ errorText, isOpen, setModalView }) => {
  const dispatch = useDispatch();
  const upperErrorText = errorText.toUpperCase();

  const handleClose = () => {
    setModalView(false);
    dispatch(putErrorMessage(''));
  };

  return (
    <Dialog open={isOpen} onEscapeKeyDown={handleClose} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="inherit" noWrap color="secondary">
          {`Error: ${upperErrorText}`}
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
