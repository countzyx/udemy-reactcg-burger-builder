// @flow
import * as _ from 'lodash';
import * as actionTypes from './actionTypes';
import type { Action, ReduxState } from '../types';

const initialState: ReduxState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 4,
};

const reducer = (state: ReduxState = initialState, action: Action): ReduxState => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      console.log(actionTypes.ADD_INGREDIENT, action);
      const ingredientName = action.payload.name;
      newState.ingredients[ingredientName] += 1;
      break;
    }
    case actionTypes.DELETE_INGREDIENT: {
      console.log(actionTypes.DELETE_INGREDIENT, action);
      const ingredientName = action.payload.name;
      if (newState.ingredients[ingredientName] > 0) {
        newState.ingredients[ingredientName] -= 1;
      }
      break;
    }
    default:
      return state;
  }

  return newState;
};

export default reducer;
