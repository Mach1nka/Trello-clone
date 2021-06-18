const PUT_USER_DATA = 'PUT_USER_DATA';
const REGISTRATION_USER = 'REGISTRATION_USER';
const LOGIN_USER = 'LOGIN_USER';
const PUT_MESSAGE_ERROR = 'PUT_MESSAGE_ERROR';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export interface AccountData {
  login: string;
  token: string;
  id: string;
  message: string;
}

export interface UserData {
  login: string;
  password: string;
}

export interface UserAction {
  type: string;
  payload: UserData;
}

const putErrorMessage = (message: string): { type: string; payload: string } => ({
  type: PUT_MESSAGE_ERROR,
  payload: message
});

const putAuthData = (userData: AccountData): { type: string; payload: AccountData } => ({
  type: PUT_USER_DATA,
  payload: userData
});

const registerUser = (userData: UserData): UserAction => ({
  type: REGISTRATION_USER,
  payload: userData
});

const loginUser = (userData: UserData): UserAction => ({
  type: LOGIN_USER,
  payload: userData
});

const signOutUser = (): { type: string } => ({
  type: USER_LOGGED_OUT
});

export {
  REGISTRATION_USER,
  LOGIN_USER,
  PUT_USER_DATA,
  PUT_MESSAGE_ERROR,
  USER_LOGGED_OUT,
  putAuthData,
  registerUser,
  loginUser,
  putErrorMessage,
  signOutUser
};
