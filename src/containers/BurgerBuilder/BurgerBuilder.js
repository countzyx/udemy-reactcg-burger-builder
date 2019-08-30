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
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { Action, ReduxState } from '../../types';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

type OwnProps = {|
  history: History,
|};

const mapStateToProps = (state: ReduxState) => ({
  error: state.burger.error,
  ingredients: state.burger.ingredients,
  isPurchasable: state.burger.isPurchasable,
  totalPrice: state.burger.totalPrice,
  userAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddIngredient: (ingredientName: string) => dispatch(actions.addIngredient(ingredientName)),
  // eslint-disable-next-line max-len
  onDeleteIngredient: (ingredientName: string) => dispatch(actions.deleteIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredientsAsync()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path)),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type DefaultProps = {};

type State = {
  purchasing: boolean,
};

class BurgerBuilder extends React.Component<Props, State> {
  state = {
    purchasing: false,
  };

  componentDidMount = () => {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  };

  purchaseHandler = () => {
    const { history, userAuthenticated, onSetAuthRedirectPath } = this.props;
    if (!userAuthenticated) {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { history, onInitPurchase } = this.props;
    onInitPurchase();
    history.push('/checkout');
  };

  render = () => {
    const { purchasing } = this.state;
    const {
      error,
      ingredients,
      isPurchasable,
      onAddIngredient,
      onDeleteIngredient,
      totalPrice,
      userAuthenticated,
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

    const orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={totalPrice}
      />
    );

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
          userAuthenticated={userAuthenticated}
        />
      </React.Fragment>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler<React.Config<Props, DefaultProps>>(BurgerBuilder, axios));
