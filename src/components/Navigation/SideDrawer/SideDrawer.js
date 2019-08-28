// @flow
import * as React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';

type Props = {|
  closed?: () => void,
  isOpen: boolean,
  userAuthenticated?: boolean,
|};

const sideDrawer = (props: Props) => {
  const { closed, isOpen, userAuthenticated } = props;
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (isOpen) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={isOpen} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems userAuthenticated={userAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};

sideDrawer.defaultProps = {
  closed: () => {},
  userAuthenticated: false,
};

export default sideDrawer;
