import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { Params } from '../resources/models/common.model';
import ApiBase from './api-base';
import { BaseResponse, ErrorInfo, ErrorResponse } from './types';
import { SERVER_URL } from '../../config';

const catchHandler = (err: AxiosError<ErrorResponse>) => {
  const errorJSON = err.toJSON() as any;

  const errorInfo: ErrorInfo = {
    message: err.response?.data.message || errorJSON.message,
    statusCode: err.response?.data.statusCode || errorJSON.status || 500
  };
  console.log('Error: ', errorInfo);

  throw errorInfo;
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
      .then(({ data }: AxiosResponse<BaseResponse<T>>) => data)
      .catch(catchHandler);
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
      .catch(catchHandler);
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
      .catch(catchHandler);
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
      .catch(catchHandler);
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
      .catch(catchHandler);
  }
}

const httpService = new HttpService(new ApiBase(SERVER_URL));

export default httpService;
