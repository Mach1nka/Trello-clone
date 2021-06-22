import { serverURL } from './api-data';
import { requestHeader, responseHandler } from './utils';

export interface User {
  id: string;
  login: string;
}

const getUsers = (searchValue = ''): Promise<User[]> =>
  fetch(`${serverURL}/users/${searchValue}`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

export { getUsers };
