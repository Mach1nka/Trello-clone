import { Action, AuthData, AuthTypes } from '../../service/resources/models/auth.model';

const initialAuthState: AuthData = {
  login: null
};

const authData = (state = initialAuthState, action: Action): AuthData => {
  switch (action.type) {
    case AuthTypes.SET_AUTH_DATA:
      return { ...state, login: action.payload.login };
    case AuthTypes.LOG_OUT:
      return {
        ...state,
        ...initialAuthState
      };
    default:
      return state;
  }
};

export default authData;
