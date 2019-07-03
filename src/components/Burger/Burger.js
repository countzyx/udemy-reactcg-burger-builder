// @flow
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

type Props = {
  ingredients: {
    bacon: number,
    cheese: number,
    meat: number,
    salad: number,
  },
};

const burger = (props: Props) => {
  const { ingredients } = props;
  const ingredientsArray = Object.keys(ingredients)
    .map(name => [...Array(ingredients[name])].map((_, i) => (
      <BurgerIngredient key={name + i} ingredientType={name} />
    )))
    .reduce((agg, el) => agg.concat(el), []);

  if (ingredientsArray.length === 0) {
    ingredientsArray.push(<p>Please start adding ingredients!</p>);
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient ingredientType="bread-top" />
      {ingredientsArray}
      <BurgerIngredient ingredientType="bread-bottom" />
    </div>
  );
};

export default burger;
