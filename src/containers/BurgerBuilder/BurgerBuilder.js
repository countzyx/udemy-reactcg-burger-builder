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
};

class BurgerBuilder extends Component<Props, State> {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
  };

  render = () => {
    const { ingredients } = this.state;
    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls />
      </React.Fragment>
    );
  };
}

export default BurgerBuilder;
