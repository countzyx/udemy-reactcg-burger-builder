// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';

type Props = {};

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<Props> {
  render = () => (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
