import { UserInfoState } from './user.model';

export interface UserCredentials {
  login: string;
  password: string;
}

export interface AuthServerResponse {
  login: string;
  token: string;
}

export interface AuthState {
  user: UserInfoState;
  isLoggedIn: boolean;
}

export enum AuthThunkAction {
  Authenticate = 'authenticate',
  Logout = 'logout'
}
