// @flow
import * as React from 'react';
import styles from './Modal.module.css';

type Props = {
  children?: React.Node,
};

const modal = (props: Props) => {
  const { children } = props;
  return <div className={styles.Modal}>{children}</div>;
};

modal.defaultProps = {
  children: null,
};

export default modal;
