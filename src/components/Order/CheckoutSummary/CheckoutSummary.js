// @flow
import * as React from 'react';
import styles from './CheckoutSummary.module.css';
import type { Ingredients } from '../../../types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

type Props = {
  checkoutCancelled?: () => void,
  checkoutContinued?: () => void,
  ingredients: Ingredients,
};

const checkoutSummary = (props: Props) => {
  const { checkoutCancelled, checkoutContinued, ingredients } = props;
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you enjoy your meal!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={ingredients} />
      </div>
      <Button buttonType="Danger" clicked={checkoutCancelled}>
        Cancel
      </Button>
      <Button buttonType="Success" clicked={checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

checkoutSummary.defaultProps = {
  checkoutCancelled: () => {},
  checkoutContinued: () => {},
};

export default checkoutSummary;
