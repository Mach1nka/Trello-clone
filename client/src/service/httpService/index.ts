import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Params } from '../resources/models/common.model';
import ApiBase from './api-base';
import { BaseResponse, ErrorInfo, ErrorResponse } from './types';

const catchHandler = (err: AxiosError<ErrorResponse>) => {
  const errorInfo: ErrorInfo = {
    message: err.response?.data.message || '',
    statusCode: err.response?.data.statusCode || 500
  };

  console.log('error: ', errorInfo);

  // @TODO: Check if here need return
  return errorInfo;
};

class HttpService {
  private apiBase: ApiBase;

  constructor(apiBase: ApiBase) {
    this.apiBase = apiBase;
  }

  get<T>(endpoint: string, params: Params = {}): Promise<BaseResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      url: endpoint,
      params
    };
    return this.apiBase
      .instance(requestConfig)
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error) => error);
  }

  post<T, S>(endpoint: string, params: Params = {}, body: S): Promise<BaseResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      url: endpoint,
      params,
      data: body
    };
    return this.apiBase
      .instance(requestConfig)
      .then(({ data }: AxiosResponse<BaseResponse<T>>) => data)
      .catch((error) => error);
  }

  put<T, S>(endpoint: string, params: Params = {}, body: S): Promise<BaseResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method: 'PUT',
      url: endpoint,
      params,
      data: body
    };
    return this.apiBase
      .instance(requestConfig)
      .then(({ data }: AxiosResponse<BaseResponse<T>>) => data)
      .catch((error) => error);
  }

  patch<T, S>(endpoint: string, params: Params = {}, body: S): Promise<BaseResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method: 'PATCH',
      url: endpoint,
      params,
      data: body
    };
    return this.apiBase
      .instance(requestConfig)
      .then(({ data }: AxiosResponse<BaseResponse<T>>) => data)
      .catch((error) => error);
  }

  delete<T>(endpoint: string, params: Params = {}): Promise<BaseResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method: 'DELETE',
      url: endpoint,
      params
    };
    return this.apiBase
      .instance(requestConfig)
      .then(({ data }: AxiosResponse<BaseResponse<T>>) => data)
      .catch((error) => error);
  }
}

const httpService = new HttpService(new ApiBase());

export default httpService;
