import { serverURL } from './api-data';
import { UserData } from '../store/auth/actions';

const registerUser = (userData: UserData): Promise<Response> =>
  fetch(`${serverURL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(userData)
  })
    .then((resp) => resp.json())
    .catch((error) => error);

const loginUser = (userData: UserData): Promise<Response> =>
  fetch(`${serverURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(userData)
  })
    .then((resp) => resp.json())
    .catch((error) => error);

export { registerUser, loginUser };
