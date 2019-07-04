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
  };

  removeIngredientHandler = (ingredientType: string) => {
    const n = 1;
    return ingredientType + n;
  };

  render = () => {
    const { ingredients } = this.state;
    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </React.Fragment>
    );
  };
}

export default BurgerBuilder;
