import { UserData, AuthDataServer } from 'services/resources/model/auth.model';
import { BaseResponse } from 'services/resources/model';
import { httpService } from 'services/HttpService';

const registerUser = (
  userData: UserData
): Promise<BaseResponse<AuthDataServer>> =>
  httpService.post({ url: '/auth/sign-up', data: userData });

const loginUser = (userData: UserData): Promise<BaseResponse<AuthDataServer>> =>
  httpService.post({ url: '/auth/login', data: userData });

export { registerUser, loginUser };
