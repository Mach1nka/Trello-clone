import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchUserRegistration, watchUserLogin } from './authorization-saga';

export default function* rootSaga(): SagaIterator {
  yield all([call(watchUserRegistration), call(watchUserLogin)]);
}
