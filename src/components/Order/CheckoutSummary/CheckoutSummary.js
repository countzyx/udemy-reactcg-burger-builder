// @flow
import * as React from 'react';
import styles from './CheckoutSummary.module.css';
import type { Ingredients } from '../../../types/TypeIngredients';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

type Props = {
  ingredients: Ingredients,
};

const checkoutSummary = (props: Props) => {
  const { ingredients } = props;
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you enjoy your meal!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={ingredients} />
      </div>
      <Button buttonType="Danger">Cancel</Button>
      <Button buttonType="Success">Continue</Button>
    </div>
  );
};
export default checkoutSummary;
