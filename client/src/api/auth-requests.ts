import { serverURL, HEADER } from '../../utils/constants';
import { UserData } from '../store/auth/types';

const registerUser = (userData: UserData): Promise<Response> =>
  fetch(`${serverURL}/auth/sign-up`, {
    method: 'POST',
    headers: HEADER,
    body: JSON.stringify(userData)
  })
    .then((resp) => resp.json())
    .catch((error) => error);

const loginUser = (userData: UserData): Promise<Response> =>
  fetch(`${serverURL}/auth/login`, {
    method: 'POST',
    headers: HEADER,
    body: JSON.stringify(userData)
  })
    .then((resp) => resp.json())
    .catch((error) => error);

export { registerUser, loginUser };
