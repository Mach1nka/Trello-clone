const serverURL = `${SERVER_URL}/api`;
const HEADER = { 'Content-Type': 'application/json;charset=utf-8' };

export enum ErrorCode {
  BadRequest = 400,
  InvalidCredentials = 401,
  NotFound = 404,
  InternalError = 500
}

export const HttpErrorCodes = [
  ErrorCode.BadRequest,
  ErrorCode.InternalError,
  ErrorCode.InvalidCredentials,
  ErrorCode.InvalidCredentials
];

export { serverURL, HEADER };
