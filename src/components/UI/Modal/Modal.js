// @flow
import * as React from 'react';
import styles from './Modal.module.css';

type Props = {
  children?: React.Node,
  show: boolean,
};

const modal = (props: Props) => {
  const { children, show } = props;
  return (
    <div
      className={styles.Modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  );
};

modal.defaultProps = {
  children: null,
};

export default modal;
