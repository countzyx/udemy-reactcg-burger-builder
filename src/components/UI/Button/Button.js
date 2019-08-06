// @flow
import * as React from 'react';
import styles from './Button.module.css';
import type { ButtonType } from '../../../types';

type Props = {
  buttonType?: ButtonType,
  children?: React.Node,
  clicked?: () => void,
  isDisabled?: boolean,
};

const button = (props: Props) => {
  const {
    buttonType, children, clicked, isDisabled,
  } = props;
  return (
    <button
      className={[styles.Button, styles[buttonType]].join(' ')}
      disabled={isDisabled}
      onClick={clicked}
      type="submit"
    >
      {children}
    </button>
  );
};

button.defaultProps = {
  buttonType: null,
  children: null,
  clicked: () => {},
  isDisabled: false,
};

export default button;
