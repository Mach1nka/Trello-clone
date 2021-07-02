import getToken from '../../utils/get-token';
import { HEADER, serverURL } from '../../utils/constants';
import { GetParams, PostParams, PutPatchDeleteParams } from './types';

const requestHeader = (): Headers => {
  const authToken = getToken();
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', authToken);

  return headers;
};

const responseHandler = (resp: Response) => (resp.status === 401 ? 401 : resp.json());

class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = ({ url, params, headersConfig }: GetParams) => {
    const path = params ? `${this.baseUrl + url}/${params}` : `${this.baseUrl + url}`;
    const headers = headersConfig || HEADER;

    return fetch(path, {
      method: 'GET',
      headers
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  post = async ({ url, data, headersConfig }: PostParams) => {
    const path = this.baseUrl + url;
    const headers = headersConfig || HEADER;

    return fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  put = async ({ url, data }: PutPatchDeleteParams) => {
    const path = this.baseUrl + url;
    const headers = requestHeader();

    return fetch(path, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  patch = async ({ url, data }: PutPatchDeleteParams) => {
    const path = this.baseUrl + url;
    const headers = requestHeader();

    return fetch(path, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  delete = async ({ url, data }: PutPatchDeleteParams) => {
    const path = this.baseUrl + url;
    const headers = requestHeader();

    return fetch(path, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(data)
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };
}

const httpService = new HttpService(serverURL);

export { requestHeader, responseHandler, httpService };
