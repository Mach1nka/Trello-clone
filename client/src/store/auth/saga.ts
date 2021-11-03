import { ForkEffect, takeEvery } from 'redux-saga/effects';

import { registerUser, loginUser } from '../../api/auth-requests';
import { REGISTRATION_USER, LOGIN_USER, putAuthData } from './actions';
import { AuthData, UserAction, UserData } from './types';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerUserLogin(userData: UserAction) {
  yield handleSagaRequest<UserData, AuthData>(loginUser, userData.payload, putAuthData);
}

function* watchUserLogin(): Generator<ForkEffect> {
  yield takeEvery(LOGIN_USER, workerUserLogin);
}

function* workerUserRegistration(userData: UserAction) {
  yield handleSagaRequest<UserData, AuthData>(registerUser, userData.payload, putAuthData);
}

function* watchUserRegistration(): Generator<ForkEffect> {
  yield takeEvery(REGISTRATION_USER, workerUserRegistration);
}

export { watchUserRegistration, watchUserLogin };
