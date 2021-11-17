import {
  HttpErrorCodes,
  ErrorCode,
  ErrorResponse,
  ErrorInfo,
  BaseResponse,
} from './types';
import { httpService } from './index';
import { removeCookies } from 'cookies-next';

const requestHeader = (authToken: string | null): Headers => {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  if (authToken) {
    headers.set('Authorization', authToken);
  }

  return headers;
};

const responseHandler = async <T>(resp: Response): Promise<BaseResponse<T>> => {
  const data = (await resp.json()) as BaseResponse<T> | ErrorResponse;

  if (HttpErrorCodes.includes(data.statusCode)) {
    const error = data as ErrorResponse;
    throw error;
  }

  return data as BaseResponse<T>;
};

const catchHandler = (err: ErrorResponse) => {
  const errorInfo: ErrorInfo = {
    message: '',
    statusCode: err.statusCode,
  };

  if (err.message) {
    errorInfo.message = err.message;
  }

  if (err.statusCode === ErrorCode.InvalidCredentials) {
    httpService.setAuthToken(null);
    removeCookies('token');
  }

  console.log('error: ', errorInfo);

  throw errorInfo;
};

export { requestHeader, responseHandler, catchHandler };
