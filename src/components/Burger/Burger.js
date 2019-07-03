/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
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
  const ingredientArray = Object.keys(ingredients).map(name => [...Array(ingredients[name])].map((_, i) => (
    <BurgerIngredient key={name + i} ingredientType={name} />
  )));

  return (
    <div className={styles.Burger}>
      <BurgerIngredient ingredientType="bread-top" />
      {ingredientArray}
      <BurgerIngredient ingredientType="bread-bottom" />
    </div>
  );
};

export default burger;
