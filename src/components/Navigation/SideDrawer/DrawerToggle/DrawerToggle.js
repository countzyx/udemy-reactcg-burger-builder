/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
// @flow
import * as React from 'react';
import styles from './DrawerToggle.module.css';

type Props = {
  clicked?: ?() => void,
};

const drawerToggle = (props: Props) => {
  const { clicked } = props;
  return (
    <div className={styles.DrawerToggle} onClick={clicked} role="menu">
      <div />
      <div />
      <div />
    </div>
  );
};

drawerToggle.defaultProps = {
  clicked: () => {},
};

export default drawerToggle;
