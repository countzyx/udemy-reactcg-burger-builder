// @flow
import * as actionTypes from './actionTypes';
import * as types from '../../types';

export const addIngredient = (ingredientName: string): types.ActionAddIngredient => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { name: ingredientName },
});

export const deleteIngredient = (ingredientName: string): types.ActionDeleteIngredient => ({
  type: actionTypes.DELETE_INGREDIENT,
  payload: { name: ingredientName },
});

export const fetchIngredientsFail = (): types.ActionFetchIngredientsFail => ({
  type: actionTypes.FETCH_INGREDIENTS_FAIL,
});

export const fetchIngredientsStart = (): types.ActionFetchIngredientsStart => ({
  type: actionTypes.FETCH_INGREDIENTS_START,
});

export const fetchIngredientsSuccess = (
  ingredients: types.Ingredients,
): types.ActionFetchIngredientsSuccess => ({
  type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
  payload: { value: ingredients },
});
