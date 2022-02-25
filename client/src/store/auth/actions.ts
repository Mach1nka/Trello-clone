import { UserData, UserAction, AuthTypes, AuthData, AuthError } from './types';

const REGISTRATION_USER = 'REGISTRATION_USER';
const LOGIN_USER = 'LOGIN_USER';

const registerUser = (userData: UserData): UserAction => ({
  type: REGISTRATION_USER,
  payload: userData
});

const loginUser = (userData: UserData): UserAction => ({
  type: LOGIN_USER,
  payload: userData
});

const putErrorMessage = (
  message: AuthError
): { type: AuthTypes.PUT_MESSAGE_ERROR; payload: AuthError } => ({
  type: AuthTypes.PUT_MESSAGE_ERROR,
  payload: message
});

const putAuthData = (userData: AuthData): { type: AuthTypes.PUT_USER_DATA; payload: AuthData } => ({
  type: AuthTypes.PUT_USER_DATA,
  payload: userData
});

const signOutUser = (): { type: AuthTypes.USER_LOGGED_OUT } => ({
  type: AuthTypes.USER_LOGGED_OUT
});

export {
  REGISTRATION_USER,
  LOGIN_USER,
  putAuthData,
  registerUser,
  loginUser,
  putErrorMessage,
  signOutUser
};
