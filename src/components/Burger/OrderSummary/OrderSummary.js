// @flow
import * as React from 'react';
import styles from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';
import type { Ingredients } from '../../../types/TypeIngredients';

type Props = {
  ingredients: Ingredients,
  purchaseCancelled: () => void,
  purchaseContinued: () => void,
  totalPrice: number,
};

const orderSummary = (props: Props) => {
  const {
    ingredients, purchaseCancelled, purchaseContinued, totalPrice,
  } = props;
  const ingredientSummary = Object.keys(ingredients).map(ingredient => (
    <li key={ingredient}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>
:
      {ingredients[ingredient]}
    </li>
  ));
  return (
    <div className={styles.OrderSummary}>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p className={styles.TotalPrice}>
Total Price: $
        {totalPrice.toFixed(2)}
      </p>
      <p>Continue to checkout?</p>
      <Button buttonType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default orderSummary;
