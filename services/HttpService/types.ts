export interface GetParams {
  url: string;
  params: string;
}

export interface CRUDParams<T> {
  url: string;
  data: T;
}

export interface ErrorParams {
  error: string;
  errorInfo: string;
}

export enum ErrorCode {
  BadRequest = 400,
  InvalidCredentials = 401,
  NotFound = 404,
  InternalError = 500,
}

export const HttpErrorCodes = [
  ErrorCode.BadRequest,
  ErrorCode.InternalError,
  ErrorCode.InvalidCredentials,
  ErrorCode.InvalidCredentials,
];
