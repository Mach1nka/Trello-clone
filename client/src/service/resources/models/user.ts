export interface UserInfoResponse {
  login: string;
}

export interface UserInfoState {
  login: string | null;
}

export interface SearchedUser {
  id: string;
  login: string;
}
