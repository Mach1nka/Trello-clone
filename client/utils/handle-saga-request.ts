import { call, put, race, delay, PutEffect, RaceEffect } from 'redux-saga/effects';

import { BaseResponse } from '../src/store/board/types';
// import { ErrorCode } from './constants';
// import { clearToken } from './token-management';
// import resetStore from './reset-store';

function* handleSagaRequest<T, S>(
  request: (data: T) => Promise<BaseResponse<S>>,
  data: T,
  putData?: (payload: S) => { type: string; payload: S }
): Generator<PutEffect | RaceEffect<any>> {
  const { response, cancel }: any = yield race({
    response: call(request, data),
    cancel: delay(5000)
  });

  console.log(cancel);

  // if (cancel) {
  //   yield put(putErrorMessage({ message: 'Something went wrong. Try later.' }));
  //   return;
  // }

  // if (HttpErrorCodes.includes(response.statusCode)) {
  //   yield put(putErrorMessage({ message: response.message }));
  // }

  // if (response.message) {
  //   yield put(putErrorMessage({ message: response.message }));
  //   return;
  // }

  if (putData) {
    yield put(putData(response.data));
  }
}

export default handleSagaRequest;
