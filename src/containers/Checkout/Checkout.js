// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
  ingredients: state.ingredients,
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps>,
|};

type State = {};

class Checkout extends Component<Props, State> {
  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHander = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  };

  render = () => {
    const { ingredients, match } = this.props;
    const checkoutSummary = ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHander}
        />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </div>
    ) : null;
    return <div>{checkoutSummary}</div>;
  };
}

export default connect(mapStateToProps)(Checkout);
