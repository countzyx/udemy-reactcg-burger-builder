// @flow
import * as _ from 'lodash';
import * as actionTypes from './actionTypes';
import type { Action, Ingredients, ReduxState } from '../types';

const initialState: ReduxState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  isPurchasable: false,
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  bacon: 1,
  cheese: 0.5,
  meat: 2,
  salad: 0.5,
};

const checkPurchasability = (ingredients: Ingredients): boolean => {
  const sum = Object.keys(ingredients).reduce<number>(
    (acc: number, k: string) => acc + ingredients[k],
    0,
  );
  return sum > 0;
};

const reducer = (state: ReduxState = initialState, action: Action): ReduxState => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      //      console.log(actionTypes.ADD_INGREDIENT, action);
      const ingredientName = action.payload.name;
      newState.ingredients[ingredientName] += 1;
      newState.isPurchasable = true;
      newState.totalPrice += INGREDIENT_PRICES[ingredientName];
      break;
    }
    case actionTypes.DELETE_INGREDIENT: {
      //      console.log(actionTypes.DELETE_INGREDIENT, action);
      const ingredientName = action.payload.name;
      if (newState.ingredients[ingredientName] > 0) {
        newState.ingredients[ingredientName] -= 1;
        newState.totalPrice -= INGREDIENT_PRICES[ingredientName];
        newState.isPurchasable = checkPurchasability(newState.ingredients);
      }
      break;
    }
    default:
      return state;
  }

  return newState;
};

export default reducer;
