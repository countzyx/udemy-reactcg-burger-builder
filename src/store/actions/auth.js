// @flow
import * as actionTypes from './actionTypes';
import * as types from '../../types';

export const logoutStart = (): types.ActionAuthLogoutStart => ({
  type: actionTypes.AUTH_LOGOUT_START,
});

export const logoutSuccess = (): types.ActionAuthLogoutSuccess => ({
  type: actionTypes.AUTH_LOGOUT_SUCCESS,
});

export const checkAuthTimeout = (expirationTime: number): types.ActionAuthCheckTimeout => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  payload: {
    value: expirationTime,
  },
});

export const authFail = (error: Error): types.ActionAuthFail => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    value: error,
  },
});

export const authStart = (email: string, password: string): types.ActionAuthStart => ({
  type: actionTypes.AUTH_START,
  payload: {
    email,
    password,
  },
});

export const authSuccess = (loginData: types.LoginData): types.ActionAuthSuccess => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    value: loginData,
  },
});

export const authUserFromLocalStore = (): types.ActionAuthUserFromLocalStore => ({
  type: actionTypes.AUTH_USER_FROM_LOCALSTORE,
});

export const setAuthRedirectPath = (path: string): types.ActionAuthRedirectPath => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: {
    value: path,
  },
});

export const signUpFail = (error: Error): types.ActionSignupFail => ({
  type: actionTypes.SIGNUP_FAIL,
  payload: {
    value: error,
  },
});

export const signUpStart = (email: string, password: string): types.ActionSignupStart => ({
  type: actionTypes.SIGNUP_START,
  payload: {
    email,
    password,
  },
});

export const signUpSuccess = (loginData: types.LoginData): types.ActionSignupSuccess => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: {
    value: loginData,
  },
});
