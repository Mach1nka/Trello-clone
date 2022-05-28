import { Dispatch } from '@reduxjs/toolkit';

import { cleaning as logout } from '../store/slices/auth';
import { cleaning as boardCleaning } from '../store/slices/board';
import { cleaning as columnCleaning } from '../store/slices/card';
import { cleaning as cardCleaning } from '../store/slices/column';

const cleaningStore = (dispatch: Dispatch<any>): void => {
  dispatch(logout());
  dispatch(boardCleaning());
  dispatch(columnCleaning());
  dispatch(cardCleaning());
};

export { cleaningStore };
