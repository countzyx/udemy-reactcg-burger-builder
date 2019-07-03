import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

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
      bacon: 1,
      cheese: 2,
      meat: 2,
      salad: 1,
    },
  };

  render = () => {
    const { ingredients } = this.state;
    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <div>BuildControls</div>
      </React.Fragment>
    );
  };
}

export default BurgerBuilder;
