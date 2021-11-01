import { takeEvery, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { registerUser, loginUser } from 'services/resources/request/auth';
import {
  REGISTRATION_USER,
  LOGIN_USER,
  putAuthData,
  putErrorMessage,
} from './action';
import { AuthResponse, UserAction } from 'services/resources/model/auth.model';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerUserLogin(userData: UserAction) {
  yield handleSagaRequest(
    loginUser,
    userData.payload,
    putAuthData,
    putErrorMessage
  );
}

function* watchUserLogin(): SagaIterator {
  yield takeEvery(LOGIN_USER, workerUserLogin);
}

function* workerUserRegistration(userData: UserAction) {
  const response: AuthResponse = yield call(registerUser, userData.payload);

  if (response.message) {
    yield put(putErrorMessage({ message: response.message }));
  }

  if (response.data) {
    yield put(putAuthData(response.data));
  }
}

function* watchUserRegistration(): SagaIterator {
  yield takeEvery(REGISTRATION_USER, workerUserRegistration);
}

export { watchUserRegistration, watchUserLogin };