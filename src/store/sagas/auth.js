// @flow
import { delay, put } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import axioslogin from '../../axios-login';
import axiossignup from '../../axios-signup';
import * as types from '../../types';
import * as actions from '../actions/auth';

export function* authUserSaga(action: types.ActionAuthStart): Saga<void> {
  const { email, password } = yield action.payload;
  const authData = yield {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = yield axioslogin.post('', authData);
    if (response.data) {
      const loginData: types.LoginData = yield { ...response.data };
      yield localStorage.setItem('loginData', JSON.stringify(loginData));
      const expirationDate = new Date(new Date().getTime() + +loginData.expiresIn * 1000);
      yield localStorage.setItem('expirationDate', expirationDate.toString());
      yield put(actions.authSuccess(loginData));
      yield put(actions.checkAuthTimeout(+loginData.expiresIn));
    } else {
      yield put(actions.authFail(Error('Login failed')));
    }
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authUserFromLocalStorageSaga(): Saga<void> {
  const loginDataString = yield localStorage.getItem('loginData');
  if (loginDataString) {
    const expirationDateString = yield localStorage.getItem('expirationDate');

    if (expirationDateString) {
      const expirationDate = yield new Date(expirationDateString);
      if (expirationDate > new Date()) {
        const loginData: types.LoginData = yield JSON.parse(loginDataString);
        const timeoutSeconds = yield (expirationDate.getTime() - new Date().getTime()) / 1000;

        yield put(actions.authSuccess(loginData));
        yield put(actions.checkAuthTimeout(timeoutSeconds));
        return;
      }
    }
  }

  yield put(actions.logoutStart());
}

export function* checkAuthTimeoutSaga(action: types.ActionAuthCheckTimeout): Saga<void> {
  yield delay(action.payload.value * 1000);
  yield put(actions.logoutStart());
}

export function* logoutSaga(): Saga<void> {
  yield localStorage.removeItem('loginData');
  yield localStorage.removeItem('expirationDate');
  yield put(actions.logoutSuccess());
}

export function* authUserSignupSaga(action: types.ActionSignupStart): Saga<void> {
  const { email, password } = yield action.payload;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = yield axiossignup.post('', authData);
    if (response.data) {
      const loginData: types.LoginData = yield { ...response.data, registered: false };
      yield put(actions.signUpSuccess(loginData));
      yield put(actions.checkAuthTimeout(+loginData.expiresIn));
    } else {
      yield put(actions.signUpFail(Error('Login failed')));
    }
  } catch (error) {
    yield put(actions.signUpFail(error));
  }
}
