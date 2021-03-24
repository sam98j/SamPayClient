import React from "react";
import styles from "./NavBar.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { NavBarProps, NavBarMapState } from "./navbar.interface";
import { AppState } from "../../../Interfaces/Store";

const NavBar = (props: NavBarProps) => {
  const { currentRoute } = props;
  console.log(currentRoute);
  return (
    <nav className={styles.NavBar}>
      <h2>{currentRoute}</h2>
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
            <IconContext.Provider value={{ color: "black" }}>
              <RiNotification2Line />
            </IconContext.Provider>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapState = (State: AppState): NavBarMapState => {
  return {
    currentRoute: State.Data.currentRoute,
  };
};

export default connect(mapState)(NavBar);
