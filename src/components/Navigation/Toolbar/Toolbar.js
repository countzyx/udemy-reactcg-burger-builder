// @flow
import * as React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './Toolbar.module.css';

type Props = {|
  drawerToggleClicked?: ?() => void,
  userAuthenticated?: boolean,
|};

const toolbar = (props: Props) => {
  const { drawerToggleClicked, userAuthenticated } = props;
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems userAuthenticated={userAuthenticated} />
      </nav>
    </header>
  );
};

toolbar.defaultProps = {
  drawerToggleClicked: null,
  userAuthenticated: false,
};

export default toolbar;
