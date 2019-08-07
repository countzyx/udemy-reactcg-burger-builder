// @flow
import * as actionTypes from './store/actionTypes';

export type ActionPayloadIngredientName = {
  name: string,
};
export type Action =
  | { type: typeof actionTypes.ADD_INGREDIENT, payload: ActionPayloadIngredientName }
  | { type: typeof actionTypes.DELETE_INGREDIENT, payload: ActionPayloadIngredientName };

export type Address = {
  street: string,
  zipCode: string,
};

export type Customer = {
  address: Address,
  email: string,
  name: string,
};

export type Ingredients = {
  bacon: number,
  cheese: number,
  meat: number,
  salad: number,
};

export type BurgerOrder = {
  customer: Customer,
  deliveryMethod: string,
  id: string,
  ingredients: Ingredients,
  price: number,
};

export type ButtonType = 'Success' | 'Danger';
export type InputType = 'input' | 'select' | 'textarea';
export type SelectOption = {
  value: string,
  displayValue: string,
};

export type FormElementConfig = {
  options: ?Array<SelectOption>,
  placeholder: ?string,
  type: string,
};

export type FormElementValidationRules = {
  required?: ?boolean,
  minLength?: ?number,
  maxLength?: ?number,
};

export type FormElement = {
  elementType: InputType,
  elementConfig: FormElementConfig,
  label: string,
  touched: boolean,
  valid: boolean,
  validation?: FormElementValidationRules,
  validationError?: ?string,
  value: string,
};

export type OrderForm = {
  deliveryMethod: FormElement,
  email: FormElement,
  name: FormElement,
  postalCode: FormElement,
  streetAddress: FormElement,
};

export type ReduxState = {
  +ingredients: ?Ingredients,
  +totalPrice: number,
};
