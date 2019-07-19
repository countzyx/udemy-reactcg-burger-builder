// @flow
import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

type Props = {};

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<Props> {
  render = () => (
    <div className={styles.App}>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
