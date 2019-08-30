// @flow
import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { Action, BurgerOrder, ReduxState } from '../../types';
import * as actions from '../../store/actions';

type OwnProps = {};
type DefaultProps = {};

const mapStateToProps = (state: ReduxState) => ({
  error: state.orders.error,
  loading: state.orders.loading,
  orders: state.orders.orders,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  // eslint-disable-next-line max-len
  onInitOrders: (token: string, userId: string) => dispatch(actions.fetchOrdersAsync(token, userId)),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type State = {};

class Orders extends React.Component<Props, State> {
  state = {};

  componentDidMount = () => {
    const { token, userId, onInitOrders } = this.props;
    onInitOrders(token, userId);
  };

  render = () => {
    const { error, loading, orders } = this.props;

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
          ? orders.map((order: BurgerOrder) => {
            const orderId = order.id ? order.id : _.uniqueId();
            return (
              <Order
                key={orderId}
                ingredients={order.ingredients}
                orderId={orderId}
                price={order.price}
              />
            );
          })
          : null}
      </div>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler<React.Config<Props, DefaultProps>>(Orders, axios));
