// @flow
import type { ReduxDispatch } from 'redux';
import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';
import type { Ingredients } from '../../types';

export const addIngredient = (ingredientName: string) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { name: ingredientName },
});

export const deleteIngredient = (ingredientName: string) => ({
  type: actionTypes.DELETE_INGREDIENT,
  payload: { name: ingredientName },
});

export const setIngredients = (ingredients: Ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: { value: ingredients },
});

export const failFetchIngredients = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredientsAsync = () => (dispatch: ReduxDispatch) => {
  axios
    .get('/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch(() => {
      dispatch(failFetchIngredients());
    });
};
