import { UserData, AuthDataServer } from 'services/resources/model/auth.model';
import { BaseResponse } from 'services/HttpService/types';
import { httpService } from 'services/HttpService';

const registerUser = (
  userData: UserData
): Promise<BaseResponse<AuthDataServer>> =>
  httpService.post<UserData, AuthDataServer>({
    url: '/auth/sign-up',
    data: userData,
  });

const loginUser = (userData: UserData): Promise<BaseResponse<AuthDataServer>> =>
  httpService.post<UserData, AuthDataServer>({
    url: '/auth/login',
    data: userData,
  });

export { registerUser, loginUser };
