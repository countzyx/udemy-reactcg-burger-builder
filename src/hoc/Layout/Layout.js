// @flow
import * as React from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
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
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(previousState => ({ showSideDrawer: !previousState.showSideDrawer }));
  };

  render = () => {
    const { children } = this.props;
    const { showSideDrawer } = this.state;

    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer closed={this.sideDrawerClosedHandler} isOpen={showSideDrawer} />
        <main className={styles.Content}>{children}</main>
      </React.Fragment>
    );
  };
}

export default Layout;
