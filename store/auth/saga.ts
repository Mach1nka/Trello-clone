import { takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { registerUser, loginUser } from 'services/resources/request/auth';
import {
  REGISTRATION_USER,
  LOGIN_USER,
  putAuthData,
  putErrorMessage,
} from './action';
import {
  AuthData,
  AuthResponse,
  UserAction,
  UserData,
} from 'services/resources/model/auth.model';
import { sagaHandler } from 'services/HttpService/utils';

function* workerUserLogin(userData: UserAction) {
  sagaHandler<UserData, AuthData>(loginUser, userData.payload, putAuthData);
}

function* watchUserLogin(): SagaIterator {
  yield takeEvery(LOGIN_USER, workerUserLogin);
}

function* workerUserRegistration(userData: UserAction) {
  sagaHandler<UserData, AuthData>(registerUser, userData.payload, putAuthData);
}

function* watchUserRegistration(): SagaIterator {
  yield takeEvery(REGISTRATION_USER, workerUserRegistration);
}

export { watchUserRegistration, watchUserLogin };
