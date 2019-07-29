// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

type Props = {
  children?: React.Node,
  link: string,
};

const navigationItem = (props: Props) => {
  const { children, link } = props;
  return (
    <li className={styles.NavigationItem}>
      <NavLink to={link} exact activeClassName={styles.active}>
        {children}
      </NavLink>
    </li>
  );
};

navigationItem.defaultProps = {
  children: null,
};

export default navigationItem;
