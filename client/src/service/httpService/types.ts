export enum HttpStatus {
  BadRequest = 400,
  InvalidCredentials = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalError = 500
}

export const HttpErrorCodes = Object.values(HttpStatus);

console.log(HttpErrorCodes);

export interface BaseResponse<T> {
  statusCode: number;
  data: T;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, unknown>;
}

export type ErrorInfo = Omit<ErrorResponse, 'errors'>;
