// @flow
import type { Customer } from './TypeCustomer';
import type { Ingredients } from './TypeIngredients';

export type BurgerOrder = {
  customer: Customer,
  deliveryMethod: string,
  id: string,
  ingredients: Ingredients,
  price: number,
};
