export type UserData = {
  login: string;
  password: string;
};

export interface AuthDataServer {
  login: string;
  token: string;
  id: string;
}

export enum AuthTypes {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

export interface AuthData {
  id: string | null;
  login: string | null;
  token: string | null;
}
