import {
  AuthDataResponse,
  AuthTypes,
  UserCredentials,
  Action
} from '../../service/resources/models/auth.model';

const signup = (credentials: UserCredentials) => ({
  type: AuthTypes.SIGN_UP,
  payload: credentials
});

const login = (credentials: UserCredentials) => ({
  type: AuthTypes.LOG_IN,
  payload: credentials
});

const setAuthData = (userData: AuthDataResponse) => ({
  type: AuthTypes.SET_AUTH_DATA,
  payload: userData
});

const logout = (): Action => ({
  type: AuthTypes.LOG_OUT
});

export { signup, login, setAuthData, logout };
