import React from 'react';
import styles from './AppName.module.scss';
import Logo from '../../assets/vectors/wallet.png';
import AppIcon from '../AppIcon/AppIcon';

const AppName = () => {
  return (
    <h2 className={styles.AppName}>
      <AppIcon />
      <span className="text-xl">SamPay</span>
    </h2>
  );
};

export default AppName;
