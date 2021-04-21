import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { registerUser, loginUser } from '../../api/auth-requests';
import { REGISTRATION_USER, LOGIN_USER, putAuthData } from './actions';

interface UserData {
  type: string;
  payload: {
    login: string;
    password: string;
  };
}

interface ServerResponse {
  login: string;
  token: string;
  message?: string;
}

function* workerUserLogin(userData: UserData) {
  const data: ServerResponse = yield call(loginUser, userData.payload);
  yield put(putAuthData(data));
}

function* watchUserLogin(): SagaIterator {
  yield takeEvery(LOGIN_USER, workerUserLogin);
}

function* workerUserRegistration(userData: UserData) {
  const data: ServerResponse = yield call(registerUser, userData.payload);
  yield put(putAuthData(data));
}

function* watchUserRegistration(): SagaIterator {
  yield takeEvery(REGISTRATION_USER, workerUserRegistration);
}

export { watchUserRegistration, watchUserLogin };
