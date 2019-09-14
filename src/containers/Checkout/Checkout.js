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

const Checkout = (props: Props) => {
  const {
    history, ingredients, match, purchased,
  } = props;

  const cancelCheckoutHandler = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const continueCheckoutHander = React.useCallback(() => {
    history.replace('/checkout/contact-data');
  }, [history]);

  if (purchased) {
    return <Redirect to="/" />;
  }

  const checkoutSummary = ingredients ? (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={cancelCheckoutHandler}
        checkoutContinued={continueCheckoutHander}
      />
      <Route path={`${match.path}/contact-data`} component={ContactData} />
    </div>
  ) : (
    <Redirect to="/" />
  );
  return checkoutSummary;
};

export default connect(mapStateToProps)(Checkout);
