// @flow
import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName: string) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { name: ingredientName },
});

export const deleteIngredient = (ingredientName: string) => ({
  type: actionTypes.DELETE_INGREDIENT,
  payload: { name: ingredientName },
});
