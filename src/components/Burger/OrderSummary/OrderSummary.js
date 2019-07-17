// @flow
import * as React from 'react';
import type { Ingredients } from '../../../types/TypeIngredients';

type Props = {
  ingredients: Ingredients,
};

const orderSummary = (props: Props) => {
  const { ingredients } = props;
  const ingredientSummary = Object.keys(ingredients).map(ingredient => (
    <li key={ingredient}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>
:
      {ingredients[ingredient]}
    </li>
  ));
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </React.Fragment>
  );
};

export default orderSummary;
