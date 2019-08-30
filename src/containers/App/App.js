// @flow
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import type { Action, ReduxState } from '../../types';
import * as actions from '../../store/actions';
import styles from './App.module.css';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';

type OwnProps = {||};

const mapStateToProps = (state: ReduxState) => ({
  userAuthenticated: state.auth.token != null,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAuthFromLocalStore: () => dispatch(actions.authFromLocalStoreAsync()),
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
          <Switch>
            {!userAuthenticated ? <Route path="/auth" component={Auth} /> : null}
            {userAuthenticated ? <Route path="/logout" component={Logout} /> : null}
            {userAuthenticated ? <Route path="/checkout" component={Checkout} /> : null}
            {userAuthenticated ? <Route path="/orders" component={Orders} /> : null}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
