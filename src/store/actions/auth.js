// @flow
import type { ReduxDispatch } from 'redux';
import axioslogin from '../../axios-login';
import axiossignup from '../../axios-signup';
import * as actionTypes from './actionTypes';
import type { Action, LoginData } from '../../types';

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeoutAsync = (expirationTime: string) => (dispatch: ReduxDispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, +expirationTime);
};

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
        dispatch(authSuccess(loginData));
        dispatch(checkAuthTimeoutAsync(loginData.expiresIn));
      } else {
        dispatch(authFail(Error('Login failed')));
      }
    })
    .catch((error) => {
      dispatch(authFail(error));
    });
};

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
        dispatch(checkAuthTimeoutAsync(loginData.expiresIn));
      } else {
        dispatch(signUpFail(Error('Login failed')));
      }
    })
    .catch((error) => {
      dispatch(signUpFail(error));
    });
};
