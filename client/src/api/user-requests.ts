import { httpService, requestHeader } from './utils';

export interface User {
  id: string;
  login: string;
}

export interface UsersResponse {
  statusCode: number;
  data: User[];
}

const getUsers = (searchValue = ''): Promise<UsersResponse> =>
  httpService.get({ url: '/users', params: searchValue, headersConfig: requestHeader() });

export { getUsers };
