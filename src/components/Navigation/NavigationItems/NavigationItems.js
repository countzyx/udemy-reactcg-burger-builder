// @flow
import * as React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

type Props = {|
  userAuthenticated?: boolean,
|};

const navigationItems = (props: Props) => {
  const { userAuthenticated } = props;
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {userAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {userAuthenticated ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Login</NavigationItem>
      )}
    </ul>
  );
};

navigationItems.defaultProps = {
  userAuthenticated: false,
};

export default navigationItems;
