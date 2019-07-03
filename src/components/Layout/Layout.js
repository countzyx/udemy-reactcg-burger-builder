// @flow
import React from 'react';
import type { Node } from 'react';
import styles from './Layout.module.css';

type Props = {
  children?: Node,
};

const layout = (props: Props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={styles.Content}>{children}</main>
    </React.Fragment>
  );
};

layout.defaultProps = {
  children: null,
};

export default layout;
