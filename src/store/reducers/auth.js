// @flow
import * as _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import type { Action, AuthState, LoginData } from '../../types';

const initialState: AuthState = {
  error: null,
  loading: false,
  token: null,
  userId: null,
};

const reducer = (state: AuthState = initialState, action: Action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.AUTH_FAIL:
    case actionTypes.SIGNUP_FAIL: {
      const error: Error = action.payload.value;
      newState.error = error;
      newState.loading = false;
      break;
    }
    case actionTypes.AUTH_START:
    case actionTypes.SIGNUP_START: {
      newState.error = null;
      newState.loading = true;
      break;
    }
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS: {
      const loginData: LoginData = action.payload.value;
      newState.error = null;
      newState.loading = false;
      newState.token = loginData.idToken;
      newState.userId = loginData.localId;
      break;
    }
    default: {
      return state;
    }
  }

  return newState;
};

export default reducer;
