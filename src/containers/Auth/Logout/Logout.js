// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Dispatch, ReduxProps } from 'redux';
import type { Action } from '../../../types';
import * as actions from '../../../store/actions';

type OwnProps = {||};

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onLogout: () => dispatch(actions.logoutStart()),
});

type Props = {|
  ...OwnProps,
  ...ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps>,
|};

type State = {};

class Logout extends React.Component<Props, State> {
  componentDidMount = () => {
    const { onLogout } = this.props;
    onLogout();
  };

  render = () => <Redirect to="/" />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
