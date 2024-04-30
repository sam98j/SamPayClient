import React from 'react';
import styles from './LoginNav.module.scss';
import AppName from '../AppName/AppName';

const LoginNav = () => {
  return (
    <header className={styles.LoginNav}>
      <AppName />
      <ul className={styles.NavLinks}>
        <li>Agency</li>
        <li>Sercives</li>
        <li>Contact</li>
      </ul>
    </header>
  );
};

export default LoginNav;
