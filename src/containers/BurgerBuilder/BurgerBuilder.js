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
  onInitIngredients: () => dispatch(actions.fetchIngredientsStart()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: (path: string) => dispatch(actions.setAuthRedirectPath(path)),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type DefaultProps = {};

export const BurgerBuilder = (props: Props) => {
  const [purchasingState, setPurchasingState] = React.useState(false);
  const {
    error,
    history,
    ingredients,
    isPurchasable,
    onAddIngredient,
    onDeleteIngredient,
    onInitIngredients,
    onInitPurchase,
    onSetAuthRedirectPath,
    totalPrice,
    userAuthenticated,
  } = props;

  React.useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = React.useCallback(() => {
    if (!userAuthenticated) {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
    setPurchasingState(true);
  }, [history, onSetAuthRedirectPath, setPurchasingState, userAuthenticated]);

  const cancelPurchaseHandler = React.useCallback(() => {
    setPurchasingState(false);
  }, [setPurchasingState]);

  const continuePurchaseHandler = React.useCallback(() => {
    onInitPurchase();
    history.push('/checkout');
  }, [history, onInitPurchase]);

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
      purchaseCancelled={cancelPurchaseHandler}
      purchaseContinued={continuePurchaseHandler}
      totalPrice={totalPrice}
    />
  );

  return (
    <React.Fragment>
      <Modal show={purchasingState} modalClosed={cancelPurchaseHandler}>
        {orderSummary}
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        disableRemoveIngredient={disableRemoveIngredient}
        ingredientAdded={onAddIngredient}
        ingredientRemoved={onDeleteIngredient}
        ordered={purchaseHandler}
        purchaseable={isPurchasable}
        totalPrice={totalPrice}
        userAuthenticated={userAuthenticated}
      />
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler<React.Config<Props, DefaultProps>>(BurgerBuilder, axios));
