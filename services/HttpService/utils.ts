import { HttpErrorCodes } from './types';

const requestHeader = (authToken?: string): Headers => {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  if (authToken) {
    headers.set('Authorization', authToken);
  }

  return headers;
};

const responseHandler = (resp: Response): Promise<Response> => resp.json();

const catchHandler = (err: any): string => {
  // @note Must be improved
  return err.message;
};

export { requestHeader, responseHandler, catchHandler };
