// @flow
import { takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import * as auth from './auth';
import * as burger from './burgerBuilder';
import * as order from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchSagas(): Saga<void> {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, auth.checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_START, auth.authUserSaga);
  yield takeEvery(actionTypes.AUTH_USER_FROM_LOCALSTORE, auth.authUserFromLocalStorageSaga);
  yield takeEvery(actionTypes.AUTH_LOGOUT_START, auth.logoutSaga);
  yield takeEvery(actionTypes.SIGNUP_START, auth.authUserSignupSaga);
  yield takeEvery(actionTypes.FETCH_INGREDIENTS_START, burger.fetchIngredientsSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_START, order.fetchOrdersSaga);
  yield takeEvery(actionTypes.PURCHASE_BURGER_START, order.purchaseBurgerSaga);
}

export default watchSagas;
