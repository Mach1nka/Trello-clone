import { BaseResponse } from '../../httpService/types';
import { UserCredentials, AuthDataResponse } from '../models/auth.model';
import httpService from '../../httpService/index';

const signupUser = (credentials: UserCredentials): Promise<BaseResponse<AuthDataResponse>> =>
  httpService.post<AuthDataResponse, UserCredentials>('/auth/sign-up', {}, credentials);

const loginUser = (credentials: UserCredentials): Promise<BaseResponse<AuthDataResponse>> =>
  httpService.post<AuthDataResponse, UserCredentials>('/auth/login', {}, credentials);

export { signupUser, loginUser };
