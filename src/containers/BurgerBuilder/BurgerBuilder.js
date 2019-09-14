// @flow
import * as React from 'react';
import type { History } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

type Props = {|
  history: History,
|};

type DefaultProps = {};

export const BurgerBuilder = (props: Props) => {
  const [purchasingState, setPurchasingState] = React.useState(false);
  const { history } = props;

  const dispatch = useDispatch();
  const onAddIngredient = React.useCallback(
    (ingredientName: string) => dispatch(actions.addIngredient(ingredientName)),
    [dispatch],
  );
  const onDeleteIngredient = React.useCallback(
    (ingredientName: string) => dispatch(actions.deleteIngredient(ingredientName)),
    [dispatch],
  );
  const onInitIngredients = React.useCallback(() => dispatch(actions.fetchIngredientsStart()), [
    dispatch,
  ]);
  const onInitPurchase = React.useCallback(() => dispatch(actions.purchaseInit()), [dispatch]);
  const onSetAuthRedirectPath = React.useCallback(
    (path: string) => dispatch(actions.setAuthRedirectPath(path)),
    [dispatch],
  );

  const error = useSelector(state => state.burger.error);
  const ingredients = useSelector(state => state.burger.ingredients);
  const isPurchasable = useSelector(state => state.burger.isPurchasable);
  const totalPrice = useSelector(state => state.burger.totalPrice);
  const userAuthenticated = useSelector(state => state.auth.token !== null);

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

export default withErrorHandler<React.Config<Props, DefaultProps>>(BurgerBuilder, axios);
