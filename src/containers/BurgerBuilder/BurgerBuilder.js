import React, { Component } from 'react';

type Props = {};

class BurgerBuilder extends Component<Props> {
  render = () => (
    <React.Fragment>
      <div>Burger</div>
      <div>BuildControls</div>
    </React.Fragment>
  );
}

export default BurgerBuilder;
