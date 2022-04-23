import { PayloadAction } from '@reduxjs/toolkit';

import generateActionTypeHelper from '../../../utils/action-type-helper';
import getSliceHelper from '../../../utils/slice-helper';
import {
  AuthState,
  AuthServerResponse,
  AuthThunkAction
} from '../../service/resources/models/auth.model';
import { SliceHelperProps, SliceName } from '../../service/resources/models/common.model';

const createActionType = generateActionTypeHelper(SliceName.Auth);

const authSliceSetup: Omit<SliceHelperProps<AuthState>, 'reducers'> = {
  name: SliceName.Auth,
  initialState: {
    isLoggedIn: false,
    user: {
      login: null
    }
  },
  extraReducers: {
    [createActionType(AuthThunkAction.Authenticate)]: (
      state,
      { payload }: PayloadAction<AuthServerResponse>
    ) => {
      state.isLoggedIn = true;
      state.user.login = payload.login;
    }
  }
};

const authSlice = getSliceHelper(authSliceSetup);

export const { cleaning } = authSlice.actions;
export default authSlice.reducer;
