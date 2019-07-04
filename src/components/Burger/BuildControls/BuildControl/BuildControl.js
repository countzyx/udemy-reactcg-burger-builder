// @flow
import React from 'react';
import styles from './BuildControl.module.css';

type Props = {
  label: string,
  added: () => void,
  removed: () => void,
};

const buildControl = (props: Props) => {
  const { label, added, removed } = props;
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      <button className={styles.Less} type="button" onClick={removed}>
        Less
      </button>
      <button className={styles.More} type="button" onClick={added}>
        More
      </button>
    </div>
  );
};

export default buildControl;
