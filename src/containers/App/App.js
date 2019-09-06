// @flow
import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import type { Action, ReduxState } from '../../types';
import * as actions from '../../store/actions';
import styles from './App.module.css';
import Layout from '../../hoc/Layout/Layout';
// eslint-disable-next-line import/no-named-as-default
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';

const Checkout = lazy(() => import('../Checkout/Checkout'));
const Orders = lazy(() => import('../Orders/Orders'));

type OwnProps = {||};

const mapStateToProps = (state: ReduxState) => ({
  userAuthenticated: state.auth.token != null,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAuthFromLocalStore: () => dispatch(actions.authUserFromLocalStore()),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type State = {};

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<Props, State> {
  componentDidMount = () => {
    const { onAuthFromLocalStore } = this.props;
    onAuthFromLocalStore();
  };

  render = () => {
    const { userAuthenticated } = this.props;
    return (
      <div className={styles.App}>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {!userAuthenticated ? <Route path="/auth" component={Auth} /> : null}
              {userAuthenticated ? <Route path="/logout" component={Logout} /> : null}
              {userAuthenticated ? <Route path="/checkout" component={Checkout} /> : null}
              {userAuthenticated ? <Route path="/orders" component={Orders} /> : null}
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
