import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, AuthServerResponse } from '../../service/resources/models/auth.model';
import { SliceName } from '../../service/resources/models/common.model';

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    login: null
  }
};

const authSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {
    authenticate: (state, { payload }: PayloadAction<AuthServerResponse>) => {
      state.isLoggedIn = true;
      state.user.login = payload.login;
    },
    logout: () => initialState
  }
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
