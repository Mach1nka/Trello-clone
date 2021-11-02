import { call, put, race, delay } from 'redux-saga/effects';

import { putErrorMessage } from 'store/auth/action';
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

function* sagaHandler<T, S>(
  request: (body: T) => Promise<Response>,
  body: T,
  putData: (payload: S) => { type: string; payload: S }
) {
  const { response, cancel } = yield race({
    response: call(request, body),
    cancel: delay(10000),
  });

  if (cancel) {
    yield put(putErrorMessage({ message: 'Something went wrong. Try later' }));
    return;
  }

  // if (HttpErrorCodes.includes(response.statusCode)) {
  //   yield put(putErrorMessage({ message: response.message }));
  // }

  if (response.message) {
    yield put(putErrorMessage({ message: response.message }));
    return;
  }

  yield put(putData(response.data));
}

export { requestHeader, responseHandler, sagaHandler };
