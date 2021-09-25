import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

export default function* rootSaga(): SagaIterator {
  yield all([]);
}
