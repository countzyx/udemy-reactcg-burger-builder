// @flow
import { delay, put } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import type { ActionAuthCheckTimeout } from '../../types';
import * as actions from '../actions/auth';

export function* logoutSaga(): Saga<void> {
  yield localStorage.removeItem('loginData');
  yield localStorage.removeItem('expirationDate');
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action: ActionAuthCheckTimeout): Saga<void> {
  yield delay(action.payload.value * 1000);
  yield put(actions.logoutStart());
}
