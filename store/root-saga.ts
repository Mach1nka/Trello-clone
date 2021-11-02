import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { watchUserLogin } from './auth/saga';

export default function* rootSaga(): SagaIterator {
  yield all([call(watchUserLogin)]);
}
