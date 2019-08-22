// @flow
import type { ReduxDispatch } from 'redux';
import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';
import type { Action } from '../../types';

export const authFail = (error: Error): Action => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    value: error,
  },
});

export const authStart = (): Action => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (): Action => ({
  type: actionTypes.AUTH_SUCCESS,
});

export const authAsync = (email: string, password: string) => (dispatch: ReduxDispatch) => {
  dispatch(authStart());
  // axios
  //   .post('/auth.json', order)
  //   .then((response) => {
  //     if (response.data) {
  //       dispatch(authSuccess());
  //     } else {
  //       dispatch(authFail(Error('Login failed')));
  //     }
  //   })
  //   .catch((error) => {
  //     dispatch(authFail(error));
  //   });
};
