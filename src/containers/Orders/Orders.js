// @flow
import * as React from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { BurgerOrder } from '../../types';

type Props = {};
type DefaultProps = {};
type State = {
  error: ?Error,
  loading: boolean,
  orders: ?Array<BurgerOrder>,
};

class Orders extends React.Component<Props, State> {
  state = {
    error: null,
    loading: true,
    orders: null,
  };

  componentDidMount = () => {
    axios
      .get('orders.json')
      .then((response) => {
        const orders = Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key,
        }));
        this.setState({ loading: false, orders });
      })
      .catch((error) => {
        this.setState({ loading: false, error });
      });
  };

  render = () => {
    const { error, loading, orders } = this.state;

    if (!orders) {
      if (error) {
        return (
          <p>
            Application Error:
            {error.toString()}
          </p>
        );
      }

      if (loading) {
        return <Spinner />;
      }

      return <p>No orders found.</p>;
    }

    return (
      <div>
        {orders
          ? orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              orderId={order.id}
              price={order.price}
            />
          ))
          : null}
      </div>
    );
  };
}

export default withErrorHandler<React.Config<Props, DefaultProps>>(Orders, axios);
