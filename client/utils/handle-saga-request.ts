import { call, put, race, delay, PutEffect, RaceEffect } from 'redux-saga/effects';
import { putErrorMessage } from '../src/store/auth/actions';

// import { HttpErrorCodes } from './constants';
import { BaseResponse } from '../src/store/board/types';
import { ErrorCode } from './constants';
import { removeAuthDataFromLocalStorage } from './auth-data-localstorage';
import resetStore from './reset-store';

function* handleSagaRequest<T, S>(
  request: (body: T) => Promise<BaseResponse<S>>,
  body: T,
  putData?: (payload: S) => { type: string; payload: S }
): Generator<PutEffect | RaceEffect<any>> {
  const { response, cancel }: any = yield race({
    response: call(request, body),
    cancel: delay(10000)
  });

  if (cancel) {
    yield put(putErrorMessage({ message: 'Something went wrong. Try later' }));
    return;
  }

  if (response.statusCode === ErrorCode.InvalidCredentials) {
    removeAuthDataFromLocalStorage();
    resetStore();
    return;
  }

  // if (HttpErrorCodes.includes(response.statusCode)) {
  //   yield put(putErrorMessage({ message: response.message }));
  // }

  if (response.message) {
    yield put(putErrorMessage({ message: response.message }));
    return;
  }

  if (putData) {
    yield put(putData(response.data));
  }
}

export default handleSagaRequest;
