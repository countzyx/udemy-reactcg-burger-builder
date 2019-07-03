// @flow
import React, { Component } from 'react';
import Styles from './App.module.css';
import Layout from '../components/Layout/Layout';

type Props = {};

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<Props> {
  render = () => (
    <div className={Styles.App}>
      <Layout>
        <p>Test</p>
      </Layout>
    </div>
  );
}

export default App;
