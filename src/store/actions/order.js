// @flow
import type { ReduxDispatch } from 'redux';
import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';
import type { BurgerOrder } from '../../types';

export const fetchOrdersFail = (error: Error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: {
    value: error,
  },
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = (orders: Array<BurgerOrder>) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: {
    value: orders,
  },
});

export const fetchOrdersAsync = () => (dispatch: ReduxDispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get('orders.json')
    .then((response) => {
      const orders = Object.keys(response.data).map(key => ({
        ...response.data[key],
        id: key,
      }));
      dispatch(fetchOrdersSuccess(orders));
    })
    .catch((error) => {
      dispatch(fetchOrdersFail(error));
    });
};

export const purchaseBurgerFail = (error: Error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  payload: {
    value: error,
  },
});

export const purchaseBurgerSuccess = (id: string, order: BurgerOrder) => {
  const newOrder = { ...order, id };
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      value: newOrder,
    },
  };
};

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurgerAsync = (order: BurgerOrder) => (dispatch: ReduxDispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', order)
    .then((response) => {
      const id = response.data && response.data.name;
      dispatch(purchaseBurgerSuccess(id, order));
    })
    .catch((error) => {
      dispatch(purchaseBurgerFail(error));
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});
