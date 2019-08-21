// @flow
import * as _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';
import type { Action, BurgerOrder, OrdersState } from '../../types';

const initialState: OrdersState = {
  error: false,
  loading: false,
  orders: [],
  purchased: false,
};

const reducer = (state: OrdersState = initialState, action: Action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.FETCH_ORDERS_FAIL: {
      newState.error = true;
      newState.loading = false;
      break;
    }
    case actionTypes.FETCH_ORDERS_START: {
      newState.error = false;
      newState.loading = true;
      break;
    }
    case actionTypes.FETCH_ORDERS_SUCCESS: {
      newState.orders = action.payload.value;
      newState.loading = false;
      break;
    }
    case actionTypes.PURCHASE_BURGER_FAIL: {
      newState.error = true;
      newState.loading = false;
      break;
    }
    case actionTypes.PURCHASE_BURGER_START: {
      newState.error = false;
      newState.loading = true;
      break;
    }
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      newState.loading = false;
      newState.purchased = true;
      const newOrder: BurgerOrder = action.payload.value;
      newState.orders.push(newOrder);
      break;
    }
    case actionTypes.PURCHASE_INIT: {
      newState.purchased = false;
      break;
    }
    default: {
      return state;
    }
  }

  return newState;
};

export default reducer;
