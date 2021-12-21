import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FiSearch } from "react-icons/fi";
import Notifications from "../Notifications/Notifications";
import NotificationsMenu from "../../pages/NotificationsMenu/NotificationsMenu";
import { useDispatch } from "react-redux";
import { seeNotifications } from "../../apis/system";

const NavBar = () => {
  // dispatch store action
  const dispatch = useDispatch();
  // NavBar local state
  const [state, setState] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });
  // handle open and close notifications pannel
  const handleNotificationsMenu = () => {
    // if it open close it
    if (state.isOpen) {
      setState({
        ...state,
        isOpen: false,
      });
      return;
    }
    // here that's mean it's close
    setState({
      ...state,
      isOpen: true,
    });
    // dispatch an action
    dispatch(seeNotifications());
  };
  return (
    <nav className={styles.NavBar}>
      {/* notifications menu */}
      {state.isOpen ? <NotificationsMenu /> : ""}
      {/* navbar search and notification icons */}
      <ul className={styles.AppCenter}>
        <li>
          <Link to="">
            <IconContext.Provider value={{ color: "black" }}>
              <FiSearch />
            </IconContext.Provider>
          </Link>
        </li>
        <li onClick={handleNotificationsMenu}>
          <Notifications />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
