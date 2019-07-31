// @flow
import * as React from 'react';
import styles from './Input.module.css';
import type { FormElementConfig, InputType } from '../../../types';

type Props = {
  changed?: ?(event: SyntheticEvent<HTMLInputElement>) => void,
  elementConfig: FormElementConfig,
  id: string,
  inputType: InputType,
  label: string,
  value: string,
};

const getInputElement = (
  inputType: InputType,
  elementConfig: FormElementConfig,
  value: string,
  changed: ?(event: SyntheticEvent<HTMLInputElement>) => void,
) => {
  switch (inputType) {
    case 'select':
      return (
        <select className={styles.Select} value={value} onChange={changed}>
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
        <textarea
          className={styles.InputElement}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
    default:
      return (
        <input
          className={styles.InputElement}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }
};

const input = (props: Props) => {
  const {
    changed, elementConfig, id, inputType, label, value,
  } = props;
  const inputElement = getInputElement(inputType, elementConfig, value, changed);
  return (
    <div className={styles.Input}>
      <label htmlFor={id} className={styles.Label}>
        {label}
        {inputElement}
      </label>
    </div>
  );
};

input.defaultProps = {
  changed: null,
};

export default input;
