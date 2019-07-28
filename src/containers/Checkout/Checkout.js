// @flow
import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import type { History, Location, Match } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import type { Ingredients } from '../../types/TypeIngredients';

type Props = {
  history: History,
  location: Location,
  match: Match,
};
type State = {
  ingredients: ?Ingredients,
  totalPrice: number,
};

class Checkout extends Component<Props, State> {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentDidMount = () => {
    const { location } = this.props;
    const params = queryString.parse(location.search, { parseNumbers: true });
    const ingredients = JSON.parse(params.ingredients);
    const { totalPrice } = params;
    this.setState({ ingredients, totalPrice });
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
    const { ingredients, totalPrice } = this.state;
    const { history, match } = this.props;
    const checkoutSummary = ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHander}
        />
        <Route
          path={`${match.path}/contact-data`}
          render={() => (
            <ContactData ingredients={ingredients} totalPrice={totalPrice} history={history} />
          )}
        />
      </div>
    ) : null;
    return <div>{checkoutSummary}</div>;
  };
}

export default Checkout;
