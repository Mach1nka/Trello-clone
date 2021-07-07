import getToken from '../../utils/get-token';
import { HEADER, serverURL } from '../../utils/constants';
import { GetParams, CRUDParams } from './types';

const requestHeader = (): Headers => {
  const authToken = getToken();
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', authToken);

  return headers;
};

const responseHandler = (resp: Response) => resp.json();

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

  post = <T>({ url, data, headersConfig }: CRUDParams<T>) => {
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

  put = <T>({ url, data }: CRUDParams<T>) => {
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

  patch = <T>({ url, data }: CRUDParams<T>) => {
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

  delete = <T>({ url, data }: CRUDParams<T>) => {
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
