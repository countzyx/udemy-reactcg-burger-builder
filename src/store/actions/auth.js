// @flow
import type { ReduxDispatch } from 'redux';
import axioslogin from '../../axios-login';
import axiossignup from '../../axios-signup';
import * as actionTypes from './actionTypes';
import type { Action, LoginData } from '../../types';

export const logoutStart = () => ({
  type: actionTypes.AUTH_LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: actionTypes.AUTH_LOGOUT_SUCCESS,
});

export const checkAuthTimeoutAsync = (expirationTime: number) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  payload: {
    value: expirationTime,
  },
});

export const authFail = (error: Error): Action => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    value: error,
  },
});

export const authStart = (): Action => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (loginData: LoginData): Action => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    value: loginData,
  },
});

export const authAsync = (email: string, password: string) => (dispatch: ReduxDispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  axioslogin
    .post('', authData)
    .then((response) => {
      if (response.data) {
        const loginData: LoginData = { ...response.data };
        localStorage.setItem('loginData', JSON.stringify(loginData));
        const expirationDate = new Date(new Date().getTime() + +loginData.expiresIn * 1000);
        localStorage.setItem('expirationDate', expirationDate.toString());
        dispatch(authSuccess(loginData));
        dispatch(checkAuthTimeoutAsync(+loginData.expiresIn));
      } else {
        dispatch(authFail(Error('Login failed')));
      }
    })
    .catch((error) => {
      dispatch(authFail(error));
    });
};

export const authFromLocalStoreAsync = () => (dispatch: ReduxDispatch) => {
  const loginDataString = localStorage.getItem('loginData');
  if (loginDataString) {
    const expirationDateString = localStorage.getItem('expirationDate');

    if (expirationDateString) {
      const expirationDate = new Date(expirationDateString);
      if (expirationDate > new Date()) {
        const loginData: LoginData = JSON.parse(loginDataString);
        const timeoutSeconds = (expirationDate.getTime() - new Date().getTime()) / 1000;

        dispatch(authSuccess(loginData));
        dispatch(checkAuthTimeoutAsync(timeoutSeconds));
        return;
      }
    }
  }

  dispatch(logoutStart());
};

export const setAuthRedirectPath = (path: string) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: {
    value: path,
  },
});

export const signUpFail = (error: Error): Action => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: {
    value: error,
  },
});

export const signUpStart = (): Action => ({
  type: actionTypes.SIGNUP_START,
});

export const signUpSuccess = (loginData: LoginData): Action => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    value: loginData,
  },
});

export const signUpAsync = (email: string, password: string) => (dispatch: ReduxDispatch) => {
  dispatch(signUpStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  axiossignup
    .post('', authData)
    .then((response) => {
      if (response.data) {
        const loginData: LoginData = { ...response.data, registered: false };
        dispatch(signUpSuccess(loginData));
        dispatch(checkAuthTimeoutAsync(+loginData.expiresIn));
      } else {
        dispatch(signUpFail(Error('Login failed')));
      }
    })
    .catch((error) => {
      dispatch(signUpFail(error));
    });
};
