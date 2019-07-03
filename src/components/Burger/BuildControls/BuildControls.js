// @flow
import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

type Props = {};

const controls = [
  { label: 'Bacon', ingredientType: 'bacon' },
  { label: 'Cheese', ingredientType: 'cheese' },
  { label: 'Meat', ingredientType: 'meat' },
  { label: 'Salad', ingredientType: 'salad' },
];

const buildControls = (props: Props) => (
  <div className={styles.BuildControls}>
    {controls.map(controlProps => (
      <BuildControl key={controlProps.label} {...controlProps} />
    ))}
  </div>
);

export default buildControls;
