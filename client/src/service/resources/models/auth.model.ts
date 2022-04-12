import { UserInfoState } from './user';

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
