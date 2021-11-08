import { requestHeader, responseHandler, catchHandler } from './utils';
import { GetParams, CRUDParams, ErrorResponse } from './types';
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

  getAuthToken = (): string => {
    return HttpService.authToken;
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
      .catch((error) => {
        const errorJson = error.toJSON();
        console.log('error: ', errorJson);
      });
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
      .catch((error) => {
        const errorJson = error.toJSON();
        console.log('error: ', errorJson);
      });
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
      .catch((error) => {
        const errorJson = error.toJSON();
        console.log('error: ', errorJson);
      });
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
      .catch((error) => {
        const errorJson = error.toJSON();
        console.log('error: ', errorJson);
      });
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
      .catch((error) => {
        const errorJson = error.toJSON();
        console.log('error: ', errorJson);
      });
  };
}

const httpService = new HttpService(config.baseUrl.api);

export { requestHeader, responseHandler, httpService };
