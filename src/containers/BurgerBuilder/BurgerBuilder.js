import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

type Props = {};

class BurgerBuilder extends Component<Props> {
  render = () => (
    <React.Fragment>
      <Burger />
      <div>BuildControls</div>
    </React.Fragment>
  );
}

export default BurgerBuilder;
