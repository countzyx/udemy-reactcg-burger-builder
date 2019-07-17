// @flow
import * as React from 'react';
import styles from './NavigationItem.module.css';

type Props = {
  active?: boolean,
  children?: React.Node,
  link: string,
};

const navigationItem = (props: Props) => {
  const { active, children, link } = props;
  return (
    <li className={styles.NavigationItem}>
      <a href={link} className={active ? styles.active : null}>
        {children}
      </a>
    </li>
  );
};

navigationItem.defaultProps = {
  active: false,
  children: null,
};

export default navigationItem;
