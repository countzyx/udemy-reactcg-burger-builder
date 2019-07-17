// @flow
import * as React from 'react';
import styles from './Toolbar.module.css';

type Props = {
  children?: React.Node,
};

const toolbar = (props: Props) => {
  const { children } = props;
  return (
    <header className={styles.Toolbar}>
      <div>Menu</div>
      <div>Logo</div>
      <nav>{children}</nav>
    </header>
  );
};

toolbar.defaultProps = {
  children: null,
};

export default toolbar;
