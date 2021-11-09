import { requestHeader, responseHandler, catchHandler, ErrorInfo } from './utils';
import { GetParams, CRUDParams, BaseResponse } from './types';
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

  get = <S>({ url, params }: GetParams): Promise<BaseResponse<S>> => {
    const path = params
      ? `${this.baseUrl + url}/${params}`
      : `${this.baseUrl + url}`;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'GET',
      headers,
    })
      .then((resp) => responseHandler<S>(resp))
      .catch(catchHandler);
  };

  post = <T, S>({ url, data }: CRUDParams<T>): Promise<BaseResponse<S>> => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler<S>(resp))
      .catch(catchHandler);
  };

  put = <T, S>({ url, data }: CRUDParams<T>): Promise<BaseResponse<S> | ErrorInfo> => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler<S>(resp))
      .catch(catchHandler);
  };

  patch = <T, S>({ url, data }: CRUDParams<T>): Promise<BaseResponse<S> | ErrorInfo> => {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler<S>(resp))
      .catch(catchHandler);
  };

  delete = <T, S>({ url, data }: CRUDParams<T>): Promise<BaseResponse<S> | ErrorInfo>=> {
    const path = this.baseUrl + url;
    const headers = requestHeader(HttpService.authToken);

    return fetch(path, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(data),
    })
      .then((resp) => responseHandler<S>(resp))
      .catch(catchHandler);
  };
}

const httpService = new HttpService(config.baseUrl.api);

export { requestHeader, responseHandler, httpService };
