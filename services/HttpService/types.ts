export interface GetParams {
  url: string;
  params: string;
}

export interface CRUDParams<T> {
  url: string;
  data: T;
}

export interface BaseResponse<T> {
  statusCode: number;
  data: T;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors: Record<string, unknown>;
}

export interface ErrorInfo {
  message: string;
  statusCode: number;
}

export enum ErrorCode {
  BadRequest = 400,
  InvalidCredentials = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalError = 500,
}

export const HttpErrorCodes = [
  ErrorCode.BadRequest,
  ErrorCode.InternalError,
  ErrorCode.Forbidden,
  ErrorCode.InvalidCredentials,
  ErrorCode.Conflict,
  ErrorCode.InternalError,
];
