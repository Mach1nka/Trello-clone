import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  ResponseType
} from 'axios';

import { clearToken, getToken } from '../../utils/token-management';
import { SERVER_URL } from '../../config';
import { ErrorResponse, HttpStatus } from './types';

class ApiBase {
  instance: AxiosInstance;

  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  private defaultResponseType: ResponseType = 'json';

  constructor() {
    this.instance = axios.create({
      baseURL: SERVER_URL,
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
      const token = getToken();

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
          clearToken();
        }
        throw error;
      }
    );
  }
}

export default ApiBase;
