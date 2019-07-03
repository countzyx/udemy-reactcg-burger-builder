// @flow
import React from 'react';
import styles from './BuildControl.module.css';

type Props = {
  label: string,
};

const buildControl = (props: Props) => {
  const { label } = props;
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      <button className={styles.Less} type="button">
        Less
      </button>
      <button className={styles.More} type="button">
        More
      </button>
    </div>
  );
};

export default buildControl;
