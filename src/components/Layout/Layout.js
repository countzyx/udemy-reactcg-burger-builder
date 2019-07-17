// @flow
import * as React from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

type Props = {
  children?: React.Node,
};

type State = {
  showSideDrawer: boolean,
};

class Layout extends React.Component<Props, State> {
  static defaultProps = {
    children: null,
  };

  state = {
    showSideDrawer: true,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render = () => {
    const { children } = this.props;
    const { showSideDrawer } = this.state;

    return (
      <React.Fragment>
        <Toolbar />
        <SideDrawer closed={this.sideDrawerClosedHandler} isOpen={showSideDrawer} />
        <main className={styles.Content}>{children}</main>
      </React.Fragment>
    );
  };
}

export default Layout;
