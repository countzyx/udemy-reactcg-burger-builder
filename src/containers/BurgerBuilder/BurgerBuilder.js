// @flow
import * as React from 'react';
import type { History } from 'react-router';
import queryString from 'query-string';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import type { Ingredients } from '../../types';

type Props = {
  history: History,
};

type DefaultProps = {};

type State = {
  error: ?Error,
  ingredients?: ?Ingredients,
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
    ingredients: null,
    loading: false,
    purchaseable: false,
    purchasing: false,
    totalPrice: 4,
  };

  componentDidMount = () => {
    axios
      .get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients).reduce<number>(
      (acc: number, k: string) => acc + ingredients[k],
      0,
    );
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (ingredientType: string) => {
    const { ingredients, totalPrice } = this.state;
    if (!ingredients) {
      return;
    }

    const oldCount = ingredients[ingredientType];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[ingredientType] = newCount;
    const priceAddition = INGREDIENT_PRICES[ingredientType];
    const newTotalPrice = totalPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (ingredientType: string) => {
    const { ingredients, totalPrice } = this.state;
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
    this.setState({ ingredients: updatedIngredients, totalPrice: newTotalPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { ingredients, totalPrice } = this.state;
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
      error, ingredients, loading, purchaseable, purchasing, totalPrice,
    } = this.state;

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
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
          purchaseable={purchaseable}
          totalPrice={totalPrice}
        />
      </React.Fragment>
    );
  };
}

export default withErrorHandler<React.Config<Props, DefaultProps>>(BurgerBuilder, axios);
