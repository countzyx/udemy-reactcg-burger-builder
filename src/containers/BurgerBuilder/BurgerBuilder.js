// @flow
import * as React from 'react';
import type { History } from 'react-router';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import queryString from 'query-string';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { Action, Ingredients, ReduxState } from '../../types';
import * as actionTypes from '../../store/actionTypes';

type OwnProps = {|
  history: History,
|};

const mapStateToProps = (state: ReduxState) => ({
  ingredients: state.ingredients,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onAddIngredient: (ingredientName: string) => dispatch({
    type: actionTypes.ADD_INGREDIENT,
    payload: { name: ingredientName },
  }),
  onDeleteIngredient: (ingredientName: string) => dispatch({
    type: actionTypes.DELETE_INGREDIENT,
    payload: { name: ingredientName },
  }),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type DefaultProps = {};

type State = {
  error: ?Error,
  loading: boolean,
  purchaseable: boolean,
  purchasing: boolean,
  totalPrice: number,
};

const INGREDIENT_PRICES = {
  bacon: 1,
  cheese: 0.5,
  meat: 2,
  salad: 0.5,
};

class BurgerBuilder extends React.Component<Props, State> {
  state = {
    error: null,
    loading: false,
    purchaseable: false,
    purchasing: false,
    totalPrice: 4,
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

  updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients).reduce<number>(
      (acc: number, k: string) => acc + ingredients[k],
      0,
    );
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (ingredientType: string) => {
    const { totalPrice } = this.state;
    const { ingredients } = this.props;
    if (!ingredients) {
      return;
    }

    const oldCount = ingredients[ingredientType];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[ingredientType] = newCount;
    const priceAddition = INGREDIENT_PRICES[ingredientType];
    const newTotalPrice = totalPrice + priceAddition;
    this.setState({ totalPrice: newTotalPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (ingredientType: string) => {
    const { totalPrice } = this.state;
    const { ingredients } = this.props;

    if (!ingredients) {
      return;
    }
    const oldCount = ingredients[ingredientType];
    if (oldCount <= 0) {
      return;
    }

    const newCount = oldCount - 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[ingredientType] = newCount;
    const priceDeduction = INGREDIENT_PRICES[ingredientType];
    const newTotalPrice = totalPrice - priceDeduction;
    this.setState({ totalPrice: newTotalPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { totalPrice } = this.state;
    const { ingredients } = this.props;

    const ingredientSearch = queryString.stringify({
      ingredients: JSON.stringify(ingredients),
      totalPrice,
    });
    const { history } = this.props;
    history.push({
      pathname: '/checkout',
      search: ingredientSearch,
    });
  };

  render = () => {
    const {
      error, loading, purchaseable, purchasing, totalPrice,
    } = this.state;
    const { ingredients, onAddIngredient, onDeleteIngredient } = this.props;

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
          purchaseable={purchaseable}
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
