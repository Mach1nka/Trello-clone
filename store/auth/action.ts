import {
  UserData,
  UserAction,
  AuthTypes,
  AuthData,
  AuthError,
} from 'services/resources/model/auth.model';

const REGISTRATION_USER = 'REGISTRATION_USER';
const LOGIN_USER = 'LOGIN_USER';

const registerUser = (userData: UserData): UserAction => ({
  type: REGISTRATION_USER,
  payload: userData,
});

const loginUser = (userData: UserData): UserAction => ({
  type: LOGIN_USER,
  payload: userData,
});

const putErrorMessage = (
  message: AuthError
): { type: string; payload: AuthError } => ({
  type: AuthTypes.PUT_MESSAGE_ERROR,
  payload: message,
});

const putAuthData = (
  userData: AuthData
): { type: string; payload: AuthData } => ({
  type: AuthTypes.PUT_USER_DATA,
  payload: userData,
});

const signOutUser = (): { type: string } => ({
  type: AuthTypes.USER_LOGGED_OUT,
});

export {
  REGISTRATION_USER,
  LOGIN_USER,
  putAuthData,
  registerUser,
  loginUser,
  putErrorMessage,
  signOutUser,
};
