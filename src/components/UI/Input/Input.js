// @flow
import * as React from 'react';
import styles from './Input.module.css';
import type { InputType } from '../../../types/TypeInputType';

type Props = {
  id: string,
  inputtype: InputType,
  label: string,
};

const getInputElement = (inputtype: InputType, props: Props) => {
  switch (inputtype) {
    case 'textarea':
      return <textarea className={styles.InputElement} {...props} />;
    default:
      return <input className={styles.InputElement} {...props} />;
  }
};

const input = (props: Props) => {
  const { id, inputtype, label } = props;
  const inputElement = getInputElement(inputtype, props);
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
