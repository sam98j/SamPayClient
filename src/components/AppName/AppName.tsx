import React from 'react';
import styles from './AppName.module.scss';
import Logo from '../../assets/vectors/wallet.png';
import AppIcon from '../AppIcon/AppIcon';
import { useTranslation } from 'react-i18next';

const AppName = () => {
  // trans hook
  const { t } = useTranslation();
  return (
    <h2 className={styles.AppName}>
      <AppIcon />
      <span className="text-xl">{t('appName')}</span>
    </h2>
  );
};

export default AppName;
