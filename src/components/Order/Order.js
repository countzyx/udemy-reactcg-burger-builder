// @flow
import * as React from 'react';
import styles from './Order.module.css';
import type { Ingredients } from '../../types';

type Props = {
  ingredients: Ingredients,
  orderId: string,
  price: number,
};

const order = (props: Props) => {
  const { ingredients, orderId, price } = props;
  const ingredientsJsx = Object.entries(ingredients).map(([k, v]) => (
    <span key={orderId + k} className={styles.Ingredient}>
      {k}
:
      {((v: any): string)}
    </span>
  ));
  return (
    <div className={styles.Order}>
      <p>
        Ingredients:
        {ingredientsJsx}
        {' '}
      </p>
      <p>
        Price:&nbsp;
        <strong>
$
          {price.toFixed(2)}
        </strong>
      </p>
    </div>
  );
};

export default order;
