const PUT_USER_DATA = 'PUT_USER_DATA';
const AUTH_USER = 'AUTH_USER';

interface UserResponse {
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
  payload?: UserResponse | UserData;
}

const putAuthData = (userData: UserResponse): UserAction => ({
  type: PUT_USER_DATA,
  payload: userData
});

const authUser = (userData: UserData): UserAction => ({
  type: AUTH_USER,
  payload: userData
});

export { AUTH_USER, PUT_USER_DATA, putAuthData, authUser };
