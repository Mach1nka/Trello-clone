const PUT_USER_DATA = 'PUT_USER_DATA';
const REGISTRATION_USER = 'REGISTRATION_USER';
const LOGIN_USER = 'LOGIN_USER';
const CLEAN_MESSAGE_ERROR = 'CLEAN_MESSAGE_ERROR';

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

const cleanErrorMessage = (): { type: string } => ({
  type: CLEAN_MESSAGE_ERROR
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
  CLEAN_MESSAGE_ERROR,
  putAuthData,
  registerUser,
  loginUser,
  cleanErrorMessage
};
