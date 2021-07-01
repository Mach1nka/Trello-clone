import { serverURL } from '../../utils/constants';
import { requestHeader, responseHandler } from './utils';

export interface User {
  id: string;
  login: string;
}

export interface UsersResponse {
  statusCode: number;
  data: User[];
}

const getUsers = (searchValue = ''): Promise<UsersResponse> =>
  fetch(`${serverURL}/users/${searchValue}`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

export { getUsers };
