import { UserCredentials, AuthServerResponse } from '../models/auth.model';
import { BaseResponse } from '../../httpService/types';
import httpService from '../../httpService/index';
import { localStorageService } from '../storages/local';

const signupUser = (credentials: UserCredentials): Promise<BaseResponse<AuthServerResponse>> =>
  httpService
    .post<AuthServerResponse, UserCredentials>('/auth/sign-up', {}, credentials)
    .then((resp) => {
      localStorageService.saveToken(resp.data.token);
      return resp;
    });

const loginUser = (credentials: UserCredentials): Promise<BaseResponse<AuthServerResponse>> =>
  httpService
    .post<AuthServerResponse, UserCredentials>('/auth/login', {}, credentials)
    .then((resp) => {
      localStorageService.saveToken(resp.data.token);
      return resp;
    });

export { signupUser, loginUser };
