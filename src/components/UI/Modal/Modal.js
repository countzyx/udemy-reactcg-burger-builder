// @flow
import * as React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

type Props = {
  children?: React.Node,
  modalClosed: () => void,
  show: boolean,
};

const modal = (props: Props) => {
  const { children, modalClosed, show } = props;
  return (
    <React.Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={styles.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

// eslint-disable-next-line max-len
const shouldNotUpdateModal = (
  prevProps: $ReadOnly<Props>,
  nextProps: $ReadOnly<Props>,
): boolean => prevProps.show === nextProps.show;

modal.defaultProps = {
  children: null,
};

export default React.memo<Props>(modal, shouldNotUpdateModal);
