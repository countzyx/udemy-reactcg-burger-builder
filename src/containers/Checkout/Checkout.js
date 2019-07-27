// @flow
import React, { Component } from 'react';
import queryString from 'query-string';
import type { History, Location } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import type { Ingredients } from '../../types/TypeIngredients';

type Props = {
  history: History,
  location: Location,
};
type State = {
  ingredients: ?Ingredients,
};

class Checkout extends Component<Props, State> {
  state = {
    ingredients: null,
  };

  componentDidMount = () => {
    const { location } = this.props;
    const ingredients = queryString.parse(location.search, { parseNumbers: true });
    this.setState({ ingredients });
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
    const checkoutSummary = ingredients ? (
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHander}
      />
    ) : null;
    return <div>{checkoutSummary}</div>;
  };
}

export default Checkout;
