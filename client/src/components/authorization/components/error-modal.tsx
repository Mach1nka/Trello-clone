import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, Typography } from '@material-ui/core';

import { putErrorMessage } from '../../../store/actions/auth';
import { AuthorizationSC as SC } from '../sc';

interface Props {
  errorText: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  setBackdropView: Dispatch<SetStateAction<boolean>>;
}

const ErrorModal: React.FC<Props> = ({ errorText, isOpen, setModalView, setBackdropView }) => {
  const dispatch = useDispatch();

  const upperErrorText = errorText.toUpperCase();

  const handleClose = useCallback(() => {
    setBackdropView(false);
    setModalView(false);
    dispatch(putErrorMessage({ message: '' }));
  }, []);

  return (
    <Dialog open={isOpen} onEscapeKeyDown={handleClose} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="inherit" noWrap color="error">
          {`Error: ${upperErrorText}`}
        </Typography>
      </DialogTitle>
      <DialogActions>
        <SC.ErrorButton onClick={handleClose} autoFocus>
          OK
        </SC.ErrorButton>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
