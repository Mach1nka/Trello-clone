import { call, put, race, delay } from 'redux-saga/effects';

function* handleSagaRequest(api: any, requestData: any, putData: any, putMessage: any) {
  const { response, cancel } = yield race({
    response: call(api, requestData),
    cancel: delay(10000)
  });

  if (cancel) {
    yield put(putMessage({ message: 'Something went wrong. Try later' }));
    return;
  }

  if (response.message) {
    yield put(putMessage({ message: response.message }));
    return;
  }

  yield put(putData(response.data));
}

export default handleSagaRequest;
