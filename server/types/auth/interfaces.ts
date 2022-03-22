export interface UserPayload {
  userId: string;
  login: string;
}

export interface AuthBody {
  login: string;
  password: string;
}

export interface AuthResponse {
  login: string;
  token: string;
}
