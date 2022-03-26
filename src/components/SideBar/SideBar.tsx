import React from "react";
import styles from "./SideBar.module.scss";
import AppName from "../AppName/AppName";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowForward } from "react-icons/all";
import { useSelector } from "react-redux";
import { AppState } from "../../types/interfaces/store";
import NavLinks from "./navLinks/NavLinks";
import ProfileBtn from "../ProfileBtn/ProfileBtn";

interface SideBarProps {
  currentRoute: string;
  client: {
    name: string;
    avatar: string;
  };
}

const SideBar = () => {
  const { currentRoute, client } = useSelector<AppState, SideBarProps>(
    ({ system, auth }) => ({
      currentRoute: system.currentRoute,
      client: {
        name: auth.client?.name!,
        avatar: auth.client?.avatar!,
      },
    })
  );
  return (
    <aside className={styles.SideBar}>
      <AppName />
      <NavLinks isOpened={true} />
      {/* profile btn */}
      <ProfileBtn />
    </aside>
  );
};

export default SideBar;
