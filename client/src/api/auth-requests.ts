import { serverURL } from './api-data';

interface UserData {
  login: string;
  password: string;
}

function registerUser(userData: UserData): Promise<Response> {
  return fetch(`${serverURL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(userData)
  })
    .then((resp) => resp.json())
    .catch((error) => error);
}

function loginUser(userData: UserData): Promise<Response> {
  return fetch(`${serverURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(userData)
  })
    .then((resp) => resp.json())
    .catch((error) => error);
}

export { registerUser, loginUser };
