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

const mapStateToProps = (state: ReduxState) => ({
  userAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = null;

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

const Layout = (props: Props) => {
  const [showSideDrawerState, setShowSideDrawerState] = React.useState(false);

  const closeSideDrawerHandler = React.useCallback(() => {
    setShowSideDrawerState(false);
  }, [setShowSideDrawerState]);

  const toggleSideDrawerHandler = React.useCallback(() => {
    setShowSideDrawerState(previousState => !previousState);
  }, [setShowSideDrawerState]);

  const { children, userAuthenticated } = props;

  return (
    <React.Fragment>
      <Toolbar
        drawerToggleClicked={toggleSideDrawerHandler}
        userAuthenticated={userAuthenticated}
      />
      <SideDrawer
        closed={closeSideDrawerHandler}
        isOpen={showSideDrawerState}
        userAuthenticated={userAuthenticated}
      />
      <main className={styles.Content}>{children}</main>
    </React.Fragment>
  );
};

Layout.defaultProps = {
  children: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
