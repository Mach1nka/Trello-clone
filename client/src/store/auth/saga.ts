import { ForkEffect, takeEvery } from 'redux-saga/effects';

import { signupUser, loginUser } from '../../service/resources/requests/auth';
import {
  AuthDataResponse,
  AuthTypes,
  SagaAction,
  UserCredentials
} from '../../service/resources/models/auth.model';
import { setAuthData } from './actions';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerLogin(action: SagaAction) {
  yield handleSagaRequest<UserCredentials, AuthDataResponse>(
    loginUser,
    action.payload,
    setAuthData
  );
}

function* watchUserLogin(): Generator<ForkEffect> {
  yield takeEvery(AuthTypes.LOG_IN, workerLogin);
}

function* workerSignup(action: SagaAction) {
  yield handleSagaRequest<UserCredentials, AuthDataResponse>(
    signupUser,
    action.payload,
    setAuthData
  );
}

function* watchUserRegistration(): Generator<ForkEffect> {
  yield takeEvery(AuthTypes.SIGN_UP, workerSignup);
}

export { watchUserRegistration, watchUserLogin };
