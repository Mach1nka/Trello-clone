import { takeEvery, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { registerUser, loginUser } from '../../api/auth-requests';
import { REGISTRATION_USER, LOGIN_USER, putAuthData, putErrorMessage } from './actions';
import { AuthSuccess, AuthError, UserAction } from './types';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerUserLogin(userData: UserAction) {
  yield handleSagaRequest(loginUser, userData.payload, putAuthData, putErrorMessage);
}

function* watchUserLogin(): SagaIterator {
  yield takeEvery(LOGIN_USER, workerUserLogin);
}

function* workerUserRegistration(userData: UserAction) {
  const data: AuthSuccess | AuthError = yield call(registerUser, userData.payload);
  if (data.message) {
    yield put(putErrorMessage({ message: data.message }));
  }
  yield put(putAuthData(data.data));
}

function* watchUserRegistration(): SagaIterator {
  yield takeEvery(REGISTRATION_USER, workerUserRegistration);
}

export { watchUserRegistration, watchUserLogin };
