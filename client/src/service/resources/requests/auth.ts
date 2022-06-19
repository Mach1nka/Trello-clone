import { UserCredentials, AuthServerResponse } from '../models/auth.model';
import { BaseResponse } from '../../httpService/types';
import httpService from '../../httpService/index';
import { saveToken } from '../localStorage/token';

const signupUser = (credentials: UserCredentials): Promise<BaseResponse<AuthServerResponse>> =>
  httpService
    .post<AuthServerResponse, UserCredentials>('/auth/sign-up', {}, credentials)
    .then((resp) => {
      saveToken(resp.data.token);
      return resp;
    });

const loginUser = (credentials: UserCredentials): Promise<BaseResponse<AuthServerResponse>> =>
  httpService
    .post<AuthServerResponse, UserCredentials>('/auth/login', {}, credentials)
    .then((resp) => {
      saveToken(resp.data.token);
      return resp;
    });

export { signupUser, loginUser };
