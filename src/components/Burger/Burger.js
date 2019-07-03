/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

type Props = {};

const burger = (props: Props) => (
  <div className={styles.Burger}>
    <BurgerIngredient ingredientType="bread-top" />
    <BurgerIngredient ingredientType="cheese" />
    <BurgerIngredient ingredientType="meat" />
    <BurgerIngredient ingredientType="bread-bottom" />
  </div>
);

export default burger;
