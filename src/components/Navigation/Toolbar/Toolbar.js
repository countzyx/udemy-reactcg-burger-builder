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
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolbar.defaultProps = {
  children: null,
};

export default toolbar;
