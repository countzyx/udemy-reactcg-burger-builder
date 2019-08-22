// @flow
import * as actionTypes from './store/actions/actionTypes';

export type DeliveryData = {
  deliveryMethod: string,
  email: string,
  name: string,
  postalCode: string,
  streetAddress: string,
};

export type Ingredients = {
  bacon: number,
  cheese: number,
  meat: number,
  salad: number,
};

export type BurgerOrder = {
  deliveryData: DeliveryData,
  id: ?string,
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
  isEmail?: boolean,
  isNumeric?: ?number,
  maxLength?: ?number,
  minLength?: ?number,
  required?: boolean,
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

export type ContactForm = {
  deliveryMethod: FormElement,
  email: FormElement,
  name: FormElement,
  postalCode: FormElement,
  streetAddress: FormElement,
};

export type AuthForm = {
  email: FormElement,
  password: FormElement,
};

export type BurgerBuilderState = {
  +error: boolean,
  +ingredients: ?Ingredients,
  +isPurchasable: boolean,
  +totalPrice: number,
};

export type OrdersState = {
  +error: boolean,
  +loading: boolean,
  +orders: Array<BurgerOrder>,
  +purchased: boolean,
};

export type ReduxState = { burger: BurgerBuilderState, orders: OrdersState };

export type ActionPayloadIngredientName = {
  name: string,
};

export type ActionPayloadErrorValue = {
  value: Error,
};

export type ActionPayloadIngredientsValue = {
  value: Ingredients,
};

export type ActionPayloadOrderValue = {
  value: BurgerOrder,
};

export type ActionPayloadOrdersValue = {
  value: Array<BurgerOrder>,
};

export type Action =
  | { type: typeof actionTypes.ADD_INGREDIENT, payload: ActionPayloadIngredientName }
  | { type: typeof actionTypes.DELETE_INGREDIENT, payload: ActionPayloadIngredientName }
  | { type: typeof actionTypes.SET_INGREDIENTS, payload: ActionPayloadIngredientsValue }
  | { type: typeof actionTypes.FETCH_INGREDIENTS_FAILED }
  | { type: typeof actionTypes.FETCH_ORDERS_FAIL, payload: ActionPayloadErrorValue }
  | { type: typeof actionTypes.FETCH_ORDERS_START }
  | { type: typeof actionTypes.FETCH_ORDERS_SUCCESS, payload: ActionPayloadOrdersValue }
  | { type: typeof actionTypes.PURCHASE_BURGER_FAIL, payload: ActionPayloadErrorValue }
  | { type: typeof actionTypes.PURCHASE_BURGER_START }
  | { type: typeof actionTypes.PURCHASE_BURGER_SUCCESS, payload: ActionPayloadOrderValue };
