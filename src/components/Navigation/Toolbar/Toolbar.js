// @flow
import * as React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './Toolbar.module.css';

type Props = {
  drawerToggleClicked?: ?() => void,
};

const toolbar = (props: Props) => {
  const { drawerToggleClicked } = props;
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

toolbar.defaultProps = {
  drawerToggleClicked: null,
};

export default toolbar;
