// @flow
import React, { Component } from 'react';
import type { History } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import type { Ingredients } from '../../types/TypeIngredients';

type Props = {
  history: History,
};
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

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHander = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  };

  render = () => {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHander}
        />
      </div>
    );
  };
}

export default Checkout;
