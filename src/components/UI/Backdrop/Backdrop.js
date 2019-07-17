// @flow
import * as React from 'react';
import styles from './Backdrop.module.css';

type Props = {
  clicked?: () => void,
  show: boolean,
};

const backdrop = (props: Props) => {
  const { clicked, show } = props;
  return show ? <div className={styles.Backdrop} onClick={clicked} role="presentation" /> : null;
};

backdrop.defaultProps = {
  clicked: () => {},
};

export default backdrop;
