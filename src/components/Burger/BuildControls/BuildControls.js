// @flow
import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

type Props = {
  disableRemoveIngredient: { [ingredient: string]: boolean },
  ingredientAdded?: (ingredientType: string) => void,
  ingredientRemoved?: (ingredientType: string) => void,
  purchaseable: boolean,
  totalPrice: number,
};

const controls = [
  { label: 'Bacon', ingredientType: 'bacon' },
  { label: 'Cheese', ingredientType: 'cheese' },
  { label: 'Meat', ingredientType: 'meat' },
  { label: 'Salad', ingredientType: 'salad' },
];

const buildControls = (props: Props) => {
  const {
    disableRemoveIngredient,
    ingredientAdded,
    ingredientRemoved,
    purchaseable,
    totalPrice,
  } = props;

  return (
    <div className={styles.BuildControls}>
      <p>
        Total Price: $
        <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(controlProps => (
        <BuildControl
          key={controlProps.label}
          {...controlProps}
          added={ingredientAdded ? () => ingredientAdded(controlProps.ingredientType) : () => {}}
          removed={
            ingredientRemoved ? () => ingredientRemoved(controlProps.ingredientType) : () => {}
          }
          disabled={disableRemoveIngredient[controlProps.ingredientType]}
        />
      ))}
      <button className={styles.OrderButton} disabled={!purchaseable} type="button">
        ORDER NOW
      </button>
    </div>
  );
};

buildControls.defaultProps = {
  ingredientAdded: null,
  ingredientRemoved: null,
};

export default buildControls;
