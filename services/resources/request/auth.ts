import { UserData } from 'services/resources/model/auth.model';
import { httpService } from 'services/HttpService';

const registerUser = (userData: UserData): Promise<Response> =>
  httpService.post({ url: '/auth/sign-up', data: userData });

const loginUser = (userData: UserData): Promise<Response> =>
  httpService.post({ url: '/auth/login', data: userData });

export { registerUser, loginUser };