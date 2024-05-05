import React from 'react';
import styles from './SideBar.module.scss';
import AppName from '../AppName/AppName';
import NavLinks from '../NavLinks/NavLinks';
import ProfileBtn from '../ProfileBtn/ProfileBtn';

const SideBar = () => {
  return (
    <aside className={`${styles.SideBar}`}>
      <AppName />
      <NavLinks isOpened={true} />
      <ProfileBtn />
    </aside>
  );
};

export default SideBar;
