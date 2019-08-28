// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { ReduxProps } from 'redux';
import type { ReduxState } from '../../types';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

type OwnProps = {|
  children?: React.Node,
|};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state: ReduxState) => ({
  userAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = null;

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

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
    const { children, userAuthenticated } = this.props;
    const { showSideDrawer } = this.state;

    return (
      <React.Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          userAuthenticated={userAuthenticated}
        />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          isOpen={showSideDrawer}
          userAuthenticated={userAuthenticated}
        />
        <main className={styles.Content}>{children}</main>
      </React.Fragment>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
