import React, { FC } from 'react';
import styles from './styles.module.scss';
import { IoIosCard, IoIosCog, IoIosContacts, IoIosAnalytics } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { AppState } from '../../types/interfaces/store';
import { NavLink } from 'react-router-dom';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { Devices } from '../../types/enums/system';
import ProfileBtn from '../ProfileBtn/ProfileBtn';
import { useTranslation } from 'react-i18next';

const NavLinks: FC<{ isOpened: boolean }> = ({ isOpened }) => {
  const { t } = useTranslation();
  const { currentRoute, device } = useSelector<AppState, { currentRoute: string; device: Devices }>(({ system }) => ({
    currentRoute: system.currentRoute,
    device: system.device,
  }));
  return (
    <div className={styles.navLinks} data-menu-open={isOpened}>
      <ul>
        <li>
          <NavLink to="/dashboard">
            <IoIosCog />
            <span>{t('navigations.dashboard')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports">
            <IoIosAnalytics />
            <span>{t('navigations.reports')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cards">
            <IoIosCard />
            <span>{t('navigations.cards')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/support">
            <IoIosContacts />
            <span>{t('navigations.support')}</span>
          </NavLink>
        </li>
      </ul>
      {/* menu tools */}
      <div className={styles.menutools}>
        {/* Profile Btn */}
        {device === Devices.MOBILE ? <ProfileBtn /> : ''}
        {/* ThemeToggler */}
        {/* show theme toggler with navNavLinks on mobile */}
        {device === Devices.MOBILE && (
          <div className={styles.nightModeContainer}>
            <span>Night Mode</span> <ThemeToggler />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
