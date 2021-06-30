import { UserData, UserAction, AuthTypes, AuthData } from './types';

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

const putErrorMessage = (message: string): { type: string; payload: string } => ({
  type: AuthTypes.PUT_MESSAGE_ERROR,
  payload: message
});

const putAuthData = (userData: AuthData): { type: string; payload: AuthData } => ({
  type: AuthTypes.PUT_USER_DATA,
  payload: userData
});

const signOutUser = (): { type: string } => ({
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
