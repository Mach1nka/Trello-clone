import getToken from '../../utils/get-token';

const requestHeader = (): Record<string, string> => {
  const authToken = getToken();
  return {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: authToken
  };
};

const responseHandler = (resp: Response) => (resp.status === 401 ? 401 : resp.json());

export { requestHeader, responseHandler };
