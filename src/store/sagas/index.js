// @flow
import { takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { checkAuthTimeoutSaga, logoutSaga } from './auth';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth(): Saga<void> {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga);
}

export default watchAuth;
