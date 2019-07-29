// @flow
import * as React from 'react';
import styles from './Order.module.css';

const order = () => (
  <div className={styles.Order}>
    <p>Ingredients: </p>
    <p>
      Price:&nbsp;
      <strong>$0.0</strong>
    </p>
  </div>
);

export default order;
