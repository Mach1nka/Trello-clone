export interface ReqUserPayload {
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

export type UserId = Pick<ReqUserPayload, 'userId'>;

export enum UserRole {
  Owner = 'Owner',
  Participant = 'Participant'
}
