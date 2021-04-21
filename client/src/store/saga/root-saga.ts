import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import watchAuth from './authorization-saga';

export default function* rootSaga(): SagaIterator {
  yield all([call(watchAuth)]);
}
