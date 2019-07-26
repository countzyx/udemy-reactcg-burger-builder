// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

const root: ?Element = document.getElementById('root');
if (root) {
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  ReactDOM.render(app, root);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
