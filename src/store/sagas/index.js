// @flow
import { all, takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import * as auth from './auth';
import * as burger from './burgerBuilder';
import * as order from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchSagas(): Saga<void> {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, auth.checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_START, auth.authUserSaga),
    takeEvery(actionTypes.AUTH_USER_FROM_LOCALSTORE, auth.authUserFromLocalStorageSaga),
    takeEvery(actionTypes.AUTH_LOGOUT_START, auth.logoutSaga),
    takeEvery(actionTypes.SIGNUP_START, auth.authUserSignupSaga),
    takeEvery(actionTypes.FETCH_INGREDIENTS_START, burger.fetchIngredientsSaga),
    takeEvery(actionTypes.FETCH_ORDERS_START, order.fetchOrdersSaga),
    takeEvery(actionTypes.PURCHASE_BURGER_START, order.purchaseBurgerSaga),
  ]);
}

export default watchSagas;
