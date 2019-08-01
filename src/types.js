// @flow
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
  valid: boolean,
  validation: FormElementValidationRules,
  value: string,
};

export type OrderForm = {
  deliveryMethod: FormElement,
  email: FormElement,
  name: FormElement,
  postalCode: FormElement,
  streetAddress: FormElement,
};
