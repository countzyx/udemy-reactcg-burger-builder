// @flow
import { put } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import axios from '../../axios-orders';
import { fetchIngredientsFail, fetchIngredientsSuccess } from '../actions/burgerBuilder';

export function* fetchIngredientsSaga(): Saga<void> {
  try {
    const response = yield axios.get('/ingredients.json');

    yield put(fetchIngredientsSuccess(response.data));
  } catch (error) {
    yield put(fetchIngredientsFail());
  }
}

export default fetchIngredientsSaga;
