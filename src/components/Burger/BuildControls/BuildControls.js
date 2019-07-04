// @flow
import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

type Props = {
  ingredientAdded?: (ingredientType: string) => void,
  ingredientRemoved?: (ingredientType: string) => void,
};

const controls = [
  { label: 'Bacon', ingredientType: 'bacon' },
  { label: 'Cheese', ingredientType: 'cheese' },
  { label: 'Meat', ingredientType: 'meat' },
  { label: 'Salad', ingredientType: 'salad' },
];

const buildControls = (props: Props) => {
  const { ingredientAdded, ingredientRemoved } = props;

  return (
    <div className={styles.BuildControls}>
      {controls.map(controlProps => (
        <BuildControl
          added={ingredientAdded ? () => ingredientAdded(controlProps.ingredientType) : () => {}}
          removed={
            ingredientRemoved ? () => ingredientRemoved(controlProps.ingredientType) : () => {}
          }
          key={controlProps.label}
          {...controlProps}
        />
      ))}
    </div>
  );
};

buildControls.defaultProps = {
  ingredientAdded: null,
  ingredientRemoved: null,
};

export default buildControls;
