import { takeEvery, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { registerUser, loginUser } from '../../api/auth-requests';
import { REGISTRATION_USER, LOGIN_USER, putAuthData, UserAction, AccountData } from './actions';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerUserLogin(userData: UserAction) {
  yield handleSagaRequest(loginUser, userData.payload, putAuthData);
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
