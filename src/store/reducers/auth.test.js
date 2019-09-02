import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      error: null,
      loading: false,
      redirectPath: '/',
      token: null,
      userId: null,
    });
  });
  it('should store the token upon login', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
          value: {
            idToken: 'idToken',
            email: 'test@email.com',
            refreshToken: 'refreshToken',
            expiresIn: '3600',
            localId: 'id',
            registered: true,
          },
        },
      }),
    ).toEqual({
      error: null,
      loading: false,
      redirectPath: '/',
      token: 'idToken',
      userId: 'id',
    });
  });
});
