import { BaseResponse } from '../../httpService/types';
import { UserCredentials, AuthServerResponse } from '../models/auth.model';
import httpService from '../../httpService/index';

const signupUser = (credentials: UserCredentials): Promise<BaseResponse<AuthServerResponse>> =>
  httpService.post<AuthServerResponse, UserCredentials>('/auth/sign-up', {}, credentials);

const loginUser = (credentials: UserCredentials): Promise<BaseResponse<AuthServerResponse>> =>
  httpService.post<AuthServerResponse, UserCredentials>('/auth/login', {}, credentials);

export { signupUser, loginUser };
