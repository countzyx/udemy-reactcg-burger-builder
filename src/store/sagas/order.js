// @flow
import { put } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import axios from '../../axios-orders';
import * as types from '../../types';
import * as actions from '../actions/order';

export function* fetchOrdersSaga(action: types.ActionFetchOrdersStart): Saga<void> {
  const { token, userId } = yield action.payload;
  try {
    const response = yield axios.get(
      `orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`,
    );
    const orders = yield Object.keys(response.data).map(key => ({
      ...response.data[key],
      id: key,
    }));
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}

export function* purchaseBurgerSaga(action: types.ActionPurchaseBurgerStart): Saga<void> {
  const { order, token } = yield action.payload;
  try {
    const response = yield axios.post(`orders.json?auth=${token}`, order);
    const id = response.data && response.data.name;
    yield put(actions.purchaseBurgerSuccess(id, order));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}
