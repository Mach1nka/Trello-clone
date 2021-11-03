import { AuthData, UserData } from '../store/auth/types';
import { BaseResponse } from '../store/board/types';
import { httpService } from './utils';

const registerUser = (userData: UserData): Promise<BaseResponse<AuthData>> =>
  httpService.post({ url: '/auth/sign-up', data: userData });

const loginUser = (userData: UserData): Promise<BaseResponse<AuthData>> =>
  httpService.post({ url: '/auth/login', data: userData });

export { registerUser, loginUser };
