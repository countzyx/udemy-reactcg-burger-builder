// @flow
import React, { Component } from 'react';
import Order from '../../components/Order/Order';

type Props = {};
type State = {};

class Orders extends Component<Props, State> {
  render = () => (
    <div>
      <Order />
      <Order />
    </div>
  );
}

export default Orders;
