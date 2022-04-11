export interface UserCredentials {
  login: string;
  password: string;
}

export interface AuthServerResponse {
  login: string;
  token: string;
}

export interface AuthState {
  user: {
    login: string | null;
  };
  isLoggedIn: boolean;
}
