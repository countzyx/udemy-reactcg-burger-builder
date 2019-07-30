// @flow
import * as React from 'react';
import styles from './Input.module.css';
import type { FormElementConfig, InputType } from '../../../types';

type Props = {
  elementConfig: FormElementConfig,
  id: string,
  inputType: InputType,
  label: string,
  value: string,
};

const getInputElement = (inputType: InputType, elementConfig: FormElementConfig, value: string) => {
  switch (inputType) {
    case 'select':
      return <select className={styles.Select} {...elementConfig} />;
    case 'textarea':
      return <textarea className={styles.InputElement} {...elementConfig} defaultValue={value} />;
    default:
      return <input className={styles.InputElement} {...elementConfig} defaultValue={value} />;
  }
};

const input = (props: Props) => {
  const {
    elementConfig, id, inputType, label, value,
  } = props;
  const inputElement = getInputElement(inputType, elementConfig, value);
  return (
    <div className={styles.Input}>
      <label htmlFor={id} className={styles.Label}>
        {label}
        {inputElement}
      </label>
    </div>
  );
};

export default input;
