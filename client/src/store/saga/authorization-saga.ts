import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { registerUser } from '../../api/auth-requests';
import { AUTH_USER, putAuthData } from '../actions/auth-action';

interface UserData {
  type: string;
  payload: {
    login: string;
    password: string;
  };
}

interface ResponseData {
  login: string;
  token: string;
  message?: string;
}

function* workerAuth(userData: UserData) {
  const data: ResponseData = yield call(registerUser, userData.payload);
  yield put(putAuthData(data));
}

function* watchAuth(): SagaIterator {
  yield takeEvery(AUTH_USER, workerAuth);
}

export default watchAuth;
