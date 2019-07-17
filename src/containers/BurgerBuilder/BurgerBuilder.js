import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import type { Ingredients } from '../../types/TypeIngredients';

type Props = {};

type State = {
  ingredients: Ingredients,
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

class BurgerBuilder extends Component<Props, State> {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
    purchaseable: false,
    purchasing: false,
    totalPrice: 4,
  };

  updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients).reduce(
      (agg: number, k: string) => agg + ingredients[k],
      0,
    );
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (ingredientType: string) => {
    const { ingredients, totalPrice } = this.state;
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

  render = () => {
    const {
      ingredients, purchaseable, purchasing, totalPrice,
    } = this.state;
    const disableRemoveIngredient = Object.assign(
      ...Object.entries(ingredients).map(([k, v]) => ({ [k]: v <= 0 })),
    );
    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={ingredients} />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disableRemoveIngredient={disableRemoveIngredient}
          purchaseable={purchaseable}
          ordered={this.purchaseHandler}
          totalPrice={totalPrice}
        />
      </React.Fragment>
    );
  };
}

export default BurgerBuilder;
