export interface UserCredentials {
  login: string;
  password: string;
}

export interface AuthDataResponse {
  login: string;
  token: string;
}

export interface SagaAction {
  type: AuthTypes.LOG_IN | AuthTypes.SIGN_UP;
  payload: UserCredentials;
}

export interface AuthData {
  login: string | null;
}

export enum AuthTypes {
  LOG_IN = 'LOG_IN',
  SIGN_UP = 'SIGN_UP',
  SET_AUTH_DATA = 'SET_AUTH_DATA',
  LOG_OUT = 'LOG_OUT'
}

export type Action =
  | { type: AuthTypes.SET_AUTH_DATA; payload: AuthDataResponse }
  | { type: AuthTypes.LOG_OUT };
