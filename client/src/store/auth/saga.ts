import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { registerUser, loginUser } from '../../api/auth-requests';
import { REGISTRATION_USER, LOGIN_USER, putAuthData, AccountData, UserAction } from './actions';

function* workerUserLogin(userData: UserAction) {
  const data: AccountData = yield call(loginUser, userData.payload);
  yield put(putAuthData(data));
}

function* watchUserLogin(): SagaIterator {
  yield takeEvery(LOGIN_USER, workerUserLogin);
}

function* workerUserRegistration(userData: UserAction) {
  const data: AccountData = yield call(registerUser, userData.payload);
  yield put(putAuthData(data));
}

function* watchUserRegistration(): SagaIterator {
  yield takeEvery(REGISTRATION_USER, workerUserRegistration);
}

export { watchUserRegistration, watchUserLogin };
