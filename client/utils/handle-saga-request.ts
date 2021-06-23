import { call, put, race, delay } from 'redux-saga/effects';
import { UserData } from '../src/store/auth/actions';

function* handleSagaRequest(api: any, requestData: UserData, putData: any, putMessage: any) {
  const { data, cancel } = yield race({ data: call(api, requestData), cancel: delay(10000) });

  if (cancel || data instanceof Error) {
    yield put(putMessage({ message: 'Something went wrong. Try later' }));
    return;
  }

  if (data.message) {
    yield put(putMessage({ message: data.message }));
    return;
  }

  yield put(putData(data.data));
}

export default handleSagaRequest;
