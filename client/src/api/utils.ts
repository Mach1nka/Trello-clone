import getToken from '../../utils/get-token';
import { HEADER } from '../../utils/constants';

const requestHeader = (): Record<string, string> => {
  const authToken = getToken();

  return {
    ...HEADER,
    Authorization: authToken
  };
};

const responseHandler = (resp: Response) => (resp.status === 401 ? 401 : resp.json());

export { requestHeader, responseHandler };
