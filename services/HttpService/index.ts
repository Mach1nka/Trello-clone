import { requestHeader, responseHandler } from './utils';
import { GetParams, CRUDParams } from './types';
import { config } from 'config';

class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static authToken = '';

  setAuthToken = (token: string): void => {
    HttpService.authToken = token;
  };

  get = ({ url, params }: GetParams) => {
    const path = params
      ? `${this.baseUrl + url}/${params}`
      : `${this.baseUrl + url}`;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'GET',
      headers,
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  post = <T>({ url, data }: CRUDParams<T>) => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  put = <T>({ url, data }: CRUDParams<T>) => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  patch = <T>({ url, data }: CRUDParams<T>) => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };

  delete = <T>({ url, data }: CRUDParams<T>) => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler(resp))
      .catch((error) => error);
  };
}

const httpService = new HttpService(config.baseUrl.api);

export { requestHeader, responseHandler, httpService };
