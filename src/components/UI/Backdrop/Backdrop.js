// @flow
import * as React from 'react';

type Props = {
  children?: React.Node,
};

const backdrop = (props: Props) => {
  const { children } = props;
  return <div>{children}</div>;
};

backdrop.defaultProps = {
  children: null,
};

export default backdrop;
