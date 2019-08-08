// @flow
import * as React from 'react';
import type { History } from 'react-router';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { Action, ReduxState } from '../../types';
import * as actions from '../../store/actions';

type OwnProps = {|
  history: History,
|};

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.ingredients,
  isPurchasable: state.isPurchasable,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddIngredient: (ingredientName: string) => dispatch(actions.addIngredient(ingredientName)),
  // eslint-disable-next-line max-len
  onDeleteIngredient: (ingredientName: string) => dispatch(actions.deleteIngredient(ingredientName)),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type DefaultProps = {};

type State = {
  error: ?Error,
  loading: boolean,
  purchasing: boolean,
};

class BurgerBuilder extends React.Component<Props, State> {
  state = {
    error: null,
    loading: false,
    purchasing: false,
  };

  // componentDidMount = () => {
  //   axios
  //     .get('/ingredients.json')
  //     .then((response) => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch((error) => {
  //       this.setState({ error });
  //     });
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render = () => {
    const { error, loading, purchasing } = this.state;
    const {
      ingredients,
      isPurchasable,
      onAddIngredient,
      onDeleteIngredient,
      totalPrice,
    } = this.props;

    if (!ingredients) {
      if (error) {
        return (
          <p>
            Application Error:
            {error.toString()}
          </p>
        );
      }
      return <Spinner />;
    }

    // Do I really needed a copy of this? Isn't this already a copy?
    const disableRemoveIngredient = Object.entries(ingredients).reduce(
      (obj: { [k: string]: boolean }, [k: string, v: number]): { [k: string]: boolean } => ({
        ...obj,
        [k]: typeof v === 'number' && v <= 0,
      }),
      {},
    );

    let orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={totalPrice}
      />
    );

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          disableRemoveIngredient={disableRemoveIngredient}
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onDeleteIngredient}
          ordered={this.purchaseHandler}
          purchaseable={isPurchasable}
          totalPrice={totalPrice}
        />
      </React.Fragment>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler<React.Config<Props, DefaultProps>>(BurgerBuilder, axios));
