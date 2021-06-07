import { call, put, race, delay } from 'redux-saga/effects';

function* handleSagaRequest(api: any, requestData: any, action: any) {
  const { data, cancel } = yield race({ data: call(api, requestData), cancel: delay(10000) });

  if (cancel) {
    yield put(action({ message: 'Something went wrong. Try later' }));
    return;
  }
  if (data instanceof Error) {
    yield put(action({ message: 'Something went wrong. Try later' }));
    return;
  }

  yield put(action(data));
}

export default handleSagaRequest;
