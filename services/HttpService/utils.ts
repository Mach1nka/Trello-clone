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

const responseHandler = (resp: Response): BaseResponse<any> | ErrorInfo => {
  const data = resp.json() as BaseResponse<any> | ErrorInfo;

  if (HttpErrorCodes.includes(data.statusCode)) {
    const errorInfo = {
      message: '',
      statusCode: data.statusCode,
    };

    if (data.message) {
      errorInfo.message = data.message;
    }

    if (data.statusCode === ErrorCode.InvalidCredentials) {
      httpService.setAuthToken('');
    }

    return errorInfo;
  }

  return data;
};

const catchHandler = (err: any): ErrorInfo => {
  const errorInfo = {
    message: '',
    statusCode: ErrorCode.InternalError,
  };

  if (err.message) {
    errorInfo.message = err.message;
  }

  httpService.setAuthToken('');

  return errorInfo;
};

export { requestHeader, responseHandler, catchHandler };
