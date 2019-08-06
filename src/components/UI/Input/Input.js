// @flow
import * as React from 'react';
import styles from './Input.module.css';
import type { FormElementConfig, InputType } from '../../../types';

type Props = {
  changed?: ?(event: SyntheticEvent<HTMLInputElement>) => void,
  elementConfig: FormElementConfig,
  id: string,
  inputType: InputType,
  invalid: boolean,
  label: string,
  shouldValidate: boolean,
  touched: boolean,
  validationError?: ?string,
  value: string,
};

const getInputElement = (
  inputType: InputType,
  elementConfig: FormElementConfig,
  value: string,
  changed: ?(event: SyntheticEvent<HTMLInputElement>) => void,
  invalid: boolean,
  shouldValidate: boolean,
  touched: boolean,
) => {
  const elementStyles = `${styles.InputElement} ${
    invalid && shouldValidate && touched ? styles.Invalid : ''
  }`;
  switch (inputType) {
    case 'select':
      return (
        <select className={elementStyles} value={value} onChange={changed}>
          {elementConfig.options ? (
            elementConfig.options.map(o => (
              <option key={o.value} value={o.value}>
                {o.displayValue}
              </option>
            ))
          ) : (
            <option>No options available.</option>
          )}
        </select>
      );
    case 'textarea':
      return (
        <textarea className={elementStyles} {...elementConfig} value={value} onChange={changed} />
      );
    default:
      return (
        <input className={elementStyles} {...elementConfig} value={value} onChange={changed} />
      );
  }
};

const getValidationErrorElement = (
  invalid: boolean,
  touched: boolean,
  validationError: ?string,
) => {
  if (invalid && touched && validationError) {
    return <p className={styles.ValidationError}>{validationError}</p>;
  }

  return null;
};

const input = (props: Props) => {
  const {
    changed,
    elementConfig,
    id,
    inputType,
    invalid,
    label,
    shouldValidate,
    touched,
    validationError,
    value,
  } = props;
  const inputElement = getInputElement(
    inputType,
    elementConfig,
    value,
    changed,
    invalid,
    shouldValidate,
    touched,
  );

  const errorElement = getValidationErrorElement(invalid, touched, validationError);

  return (
    <div className={styles.Input}>
      <label htmlFor={id} className={styles.Label}>
        {label}
        {inputElement}
        {errorElement}
      </label>
    </div>
  );
};

input.defaultProps = {
  changed: null,
  invalid: false,
  validationError: null,
};

export default input;
