import { PayloadAction } from '@reduxjs/toolkit';

import {
  AuthState,
  AuthServerResponse,
  AuthThunkAction
} from '../../service/resources/models/auth.model';
import { SliceHelperProps, SliceName } from '../../service/resources/models/common.model';

const authSliceSetup: Omit<SliceHelperProps<AuthState>, 'reducers'> = {
  name: SliceName.Auth,
  initialState: {
    isLoggedIn: false,
    user: {
      login: null
    }
  },
  extraReducers: {
    [`${SliceName.Auth}/${AuthThunkAction.Authenticate}/fulfilled`]: (
      state,
      { payload }: PayloadAction<AuthServerResponse>
    ) => {
      state.isLoggedIn = true;
      state.user.login = payload.login;
    }
  }
};

export { authSliceSetup };
