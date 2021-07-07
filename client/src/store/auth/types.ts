export enum AuthTypes {
  PUT_MESSAGE_ERROR = 'PUT_MESSAGE_ERROR',
  PUT_USER_DATA = 'PUT_USER_DATA',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT'
}

export interface UserData {
  login: string;
  password: string;
}

export interface UserAction {
  type: string;
  payload: UserData;
}

export interface AuthData {
  login: string;
  token: string;
  id: string;
}

export interface AccountDataInStore extends AuthData {
  message: string;
}

export interface AuthSuccess {
  data: AuthData;
  statusCode: number;
}

export interface AuthError {
  message: string;
  statusCode: number | null;
}

export type AuthActions =
  | { type: AuthTypes.PUT_USER_DATA; payload: AuthData }
  | { type: AuthTypes.PUT_MESSAGE_ERROR; payload: AuthError }
  | { type: AuthTypes.USER_LOGGED_OUT };
