import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

type Props = {};

type State = {
  ingredients: {
    bacon: number,
    cheese: number,
    meat: number,
    salad: number,
  },
  purchaseable: boolean,
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
    totalPrice: 4,
    purchaseable: false,
  };

  updatePurchaseState = () => {
    const { ingredients } = this.state;
    const copyIngredients = { ...ingredients };
    const sum = Object.keys(copyIngredients).reduce(
      (agg: number, k: string) => agg + copyIngredients[k],
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
    this.updatePurchaseState();
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
    this.updatePurchaseState();
  };

  render = () => {
    const { ingredients, purchaseable, totalPrice } = this.state;
    const disableRemoveIngredient = Object.assign(
      ...Object.entries(ingredients).map(([k, v]) => ({ [k]: v <= 0 })),
    );
    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disableRemoveIngredient={disableRemoveIngredient}
          purchaseable={purchaseable}
          totalPrice={totalPrice}
        />
      </React.Fragment>
    );
  };
}

export default BurgerBuilder;
