// @flow
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import type { History, Match } from 'react-router';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';
import type { Action, ReduxState } from '../../types';

type OwnProps = {|
  history: History,
  match: Match,
|};

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.burger.ingredients,
  purchased: state.orders.purchased,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onInitPurchase: () => dispatch(actions.purchaseInit()),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps>,
|};

type State = {};

class Checkout extends Component<Props, State> {
  componentWillMount = () => {
    const { onInitPurchase } = this.props;
    onInitPurchase();
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
    const { ingredients, match, purchased } = this.props;
    if (purchased) {
      return <Redirect to="/" />;
    }
    const checkoutSummary = ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHander}
        />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </div>
    ) : (
      <Redirect to="/" />
    );
    return checkoutSummary;
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
