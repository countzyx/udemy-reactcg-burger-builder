// @flow
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import type { History, Match } from 'react-router';
import { connect } from 'react-redux';
import type { ReduxProps } from 'redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import type { ReduxState } from '../../types';

type OwnProps = {|
  history: History,
  match: Match,
|};

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.burger.ingredients,
  purchased: state.orders.purchased,
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps>,
|};

const checkout = (props: Props) => {
  const { ingredients, match, purchased } = props;
  if (purchased) {
    return <Redirect to="/" />;
  }

  const checkoutCancelledHandler = () => {
    const { history } = props;
    history.goBack();
  };

  const checkoutContinuedHander = () => {
    const { history } = props;
    history.replace('/checkout/contact-data');
  };

  const checkoutSummary = ingredients ? (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHander}
      />
      <Route path={`${match.path}/contact-data`} component={ContactData} />
    </div>
  ) : (
    <Redirect to="/" />
  );
  return checkoutSummary;
};

export default connect(mapStateToProps)(checkout);
