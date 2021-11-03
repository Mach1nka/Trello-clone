import React, { Dispatch, SetStateAction, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
} from '@material-ui/core';

import { AuthorizationSC as SC } from './sc';

interface Props {
  errorText: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  setBackdropView: Dispatch<SetStateAction<boolean>>;
}
// @note must be changed on Alert
const ErrorModal: React.FC<Props> = ({
  errorText,
  isOpen,
  setModalView,
  setBackdropView,
}) => {
  const upperErrorText = errorText.toUpperCase();

  const handleClose = useCallback(() => {
    setBackdropView(false);
    setModalView(false);
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
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
