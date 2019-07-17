// @flow
import * as React from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

type Props = {
  children?: React.Node,
};

const layout = (props: Props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Toolbar />
      <SideDrawer />
      <main className={styles.Content}>{children}</main>
    </React.Fragment>
  );
};

layout.defaultProps = {
  children: null,
};

export default layout;
