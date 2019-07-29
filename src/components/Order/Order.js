// @flow
import * as React from 'react';
import styles from './Order.module.css';
import type { Ingredients } from '../../types/TypeIngredients';

type Props = {
  ingredients: Ingredients,
  price: number,
};

const order = (props: Props) => {
  const { ingredients, price } = props;
  const ingredientsJsx = Object.entries(ingredients).map(([k, v]) => (
    <span className={styles.Ingredient}>
      {k}
:
      {JSON.stringify(v)}
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
