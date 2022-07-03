import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  ResponseType
} from 'axios';

import { localStorageService } from '../resources/storages/local';
import { ErrorResponse, HttpStatus } from './types';

class ApiBase {
  instance: AxiosInstance;

  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  private defaultResponseType: ResponseType = 'json';

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      headers: this.defaultHeaders,
      responseType: this.defaultResponseType,
      timeout: 5 * 1000,
      timeoutErrorMessage: 'Request timeout.'
    });

    this.initRequestInterceptor();
    this.initResponseInterceptor();
  }

  private initRequestInterceptor() {
    this.instance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
      const token = localStorageService.getToken();

      if (token) {
        if (requestConfig.headers === undefined) {
          requestConfig.headers = {};
        }
        requestConfig.headers.Authorization = token;
      }

      return requestConfig;
    });
  }

  private initResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === HttpStatus.InvalidCredentials) {
          localStorageService.removeToken();
        }
        throw error;
      }
    );
  }
}

export default ApiBase;
