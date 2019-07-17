// @flow
import * as React from 'react';
import styles from './Button.module.css';
import type { ButtonType } from '../../../types/TypeButtonType';

type Props = {
  buttonType?: ButtonType,
  children?: React.Node,
  clicked?: () => void,
};

const button = (props: Props) => {
  const { buttonType, children, clicked } = props;
  return (
    <button
      className={[styles.Button, styles[buttonType]].join('')}
      onClick={clicked}
      type="button"
    >
      {children}
    </button>
  );
};

button.defaultProps = {
  buttonType: null,
  children: null,
  clicked: () => {},
};

export default button;
