const PUT_USER_DATA = 'PUT_USER_DATA';
const REGISTRATION_USER = 'REGISTRATION_USER';
const LOGIN_USER = 'LOGIN_USER';
const PUT_MESSAGE_ERROR = 'PUT_MESSAGE_ERROR';

interface ServerResponse {
  login: string;
  token: string;
  message?: string;
}

interface UserData {
  login: string;
  password: string;
}

interface UserAction {
  type: string;
  payload: UserData;
}

const putErrorMessage = (message: string): { type: string; payload: string } => ({
  type: PUT_MESSAGE_ERROR,
  payload: message
});

const putAuthData = (userData: ServerResponse): { type: string; payload: ServerResponse } => ({
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

export {
  REGISTRATION_USER,
  LOGIN_USER,
  PUT_USER_DATA,
  PUT_MESSAGE_ERROR,
  putAuthData,
  registerUser,
  loginUser,
  putErrorMessage
};
