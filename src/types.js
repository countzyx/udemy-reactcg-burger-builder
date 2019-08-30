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

export type LoginData = {|
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
|};

export type AuthForm = {
  email: FormElement,
  password: FormElement,
};

export type AuthState = {|
  +error: ?Error,
  +loading: boolean,
  +redirectPath: string,
  +token: ?string,
  +userId: ?string,
|};

export type BurgerBuilderState = {|
  +building: boolean,
  +error: boolean,
  +ingredients: ?Ingredients,
  +isPurchasable: boolean,
  +totalPrice: number,
|};

export type OrdersState = {|
  +error: boolean,
  +loading: boolean,
  +orders: Array<BurgerOrder>,
  +purchased: boolean,
|};

export type ReduxState = {|
  +auth: AuthState,
  +burger: BurgerBuilderState,
  +orders: OrdersState,
|};

export type ActionPayloadIngredientName = {
  name: string,
};

export type ActionPayloadErrorValue = {
  value: Error,
};

export type ActionPayloadIngredientsValue = {
  value: Ingredients,
};

export type ActionPayloadLoginDataValue = {
  value: LoginData,
};

export type ActionPayloadOrderValue = {
  value: BurgerOrder,
};

export type ActionPayloadOrdersValue = {
  value: Array<BurgerOrder>,
};

export type ActionPayloadStringValue = {
  value: string,
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
  | { type: typeof actionTypes.PURCHASE_BURGER_SUCCESS, payload: ActionPayloadOrderValue }
  | { type: typeof actionTypes.AUTH_FAIL, payload: ActionPayloadErrorValue }
  | { type: typeof actionTypes.AUTH_LOGOUT }
  | { type: typeof actionTypes.AUTH_START }
  | { type: typeof actionTypes.AUTH_SUCCESS, payload: ActionPayloadLoginDataValue }
  | { type: typeof actionTypes.SET_AUTH_REDIRECT_PATH, payload: ActionPayloadStringValue }
  | { type: typeof actionTypes.SIGNUP_FAIL, payload: ActionPayloadErrorValue }
  | { type: typeof actionTypes.SIGNUP_START }
  | { type: typeof actionTypes.SIGNUP_SUCCESS, payload: ActionPayloadLoginDataValue };
