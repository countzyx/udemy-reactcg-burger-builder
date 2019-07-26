// @flow
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import type { Ingredients } from '../../types/TypeIngredients';

type Props = {};
type State = {
  ingredients: Ingredients,
};

class Checkout extends Component<Props, State> {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1,
    },
  };

  render = () => {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary ingredients={ingredients} />
      </div>
    );
  };
}

export default Checkout;
