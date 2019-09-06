// @flow
import * as actionTypes from './actionTypes';
import type { BurgerOrder } from '../../types';

export const fetchOrdersFail = (error: Error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  payload: {
    value: error,
  },
});

export const fetchOrdersStart = (token: string, userId: string) => ({
  type: actionTypes.FETCH_ORDERS_START,
  payload: {
    token,
    userId,
  },
});

export const fetchOrdersSuccess = (orders: Array<BurgerOrder>) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: {
    value: orders,
  },
});

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

export const purchaseBurgerStart = (order: BurgerOrder, token: string) => ({
  type: actionTypes.PURCHASE_BURGER_START,
  payload: {
    order,
    token,
  },
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});
