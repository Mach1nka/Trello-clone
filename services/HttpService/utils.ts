import {
  HttpErrorCodes,
  ErrorCode,
  ErrorResponse,
  BaseResponse,
} from './types';
import { httpService } from './index';

export interface ErrorInfo {
  message: string;
  statusCode: number;
}

const requestHeader = (authToken?: string): Headers => {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  if (authToken) {
    headers.set('Authorization', authToken);
  }

  return headers;
};

const responseHandler = async <T>(resp: Response): Promise<BaseResponse<T>> => {
  const data = await resp.json() as BaseResponse<T> | ErrorResponse;

  if (HttpErrorCodes.includes(data.statusCode)) {
    const error = data as ErrorResponse;
    throw (error);
  }

  return data as BaseResponse<T>;
};

const catchHandler = (err: ErrorResponse) => {
  const errorInfo: ErrorInfo = {
    message: '',
    statusCode: ErrorCode.InternalError,
  };

  if (err.message) {
    errorInfo.message = err.message;
  }

  if (err.statusCode === ErrorCode.InvalidCredentials) {
    httpService.setAuthToken('');
  }

  console.log('error: ', errorInfo);

  throw (errorInfo);
};

export { requestHeader, responseHandler, catchHandler };
