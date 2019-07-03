// @flow
import React, { Component } from 'react';
import Styles from './App.module.css';

type Props = {};

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<Props> {
  render = () => (
    <div className={Styles.App}>
      <h1>Burger Builder</h1>
    </div>
  );
}

export default App;
