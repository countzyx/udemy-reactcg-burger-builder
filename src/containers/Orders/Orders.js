// @flow
import * as React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { BurgerOrder } from '../../types/TypeBurgerOrder';

type Props = {};
type DefaultProps = {};
type State = {
  loading: boolean,
  orders: ?Array<BurgerOrder>,
};

class Orders extends React.Component<Props, State> {
  state = {
    loading: true,
    orders: null,
  };

  componentDidMount = () => {
    axios
      .get('orders.json')
      .then((response) => {
        console.log(response.data);
        const orders = Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key,
        }));
        console.log(orders);
        this.setState({ loading: false, orders });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render = () => (
    <div>
      <Order />
      <Order />
    </div>
  );
}

export default withErrorHandler<React.Config<Props, DefaultProps>>(Orders, axios);
