// @flow
import * as React from 'react';
import styles from './Backdrop.module.css';

type Props = {
  show: boolean,
};

const backdrop = (props: Props) => {
  const { show } = props;
  return show ? <div className={styles.Backdrop} /> : null;
};

export default backdrop;
