import { UserData } from '../store/auth/types';
import { httpService } from './utils';

const registerUser = (userData: UserData): Promise<Response> =>
  httpService.post({ url: '/auth/sign-up', data: userData });

const loginUser = (userData: UserData): Promise<Response> =>
  httpService.post({ url: '/auth/login', data: userData });

export { registerUser, loginUser };
