// @flow
import * as React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

// type Props = {
//   children?: React.Node,
// };

const toolbar = () => (
  <header className={styles.Toolbar}>
    <div>Menu</div>
    <Logo />
    <NavigationItems />
  </header>
);

toolbar.defaultProps = {
  children: null,
};

export default toolbar;
