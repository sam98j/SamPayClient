import React from "react";
import styles from "./NavBar.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FiSearch } from "react-icons/fi";
import { NavBarProps } from "./navbar.interface";
import { AppState } from "../../types/interfaces/store";
import Notifications from "../Notifications/Notifications";

const NavBar = () => {
  // get state from store
  const { currentRoute } = useSelector<AppState, NavBarProps>((state) => ({
    currentRoute: state.system.currentRoute,
  }));
  return (
    <nav className={styles.NavBar}>
      {/* <h2>{currentRoute}</h2> */}
      <ul className={styles.AppCenter}>
        <li>
          <Link to="">
            <IconContext.Provider value={{ color: "black" }}>
              <FiSearch />
            </IconContext.Provider>
          </Link>
        </li>
        <li>
          <Link to="">
            <Notifications />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
