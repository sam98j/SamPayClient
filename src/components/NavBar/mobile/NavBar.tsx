import React, { useState } from "react";
import styles from "./styles.module.scss";
import MenuIcon from "../../../assets/icons/menu-svgrepo-com.svg";
import NavLinks from "../../SideBar/navLinks/NavLinks";
import AppIcon from "../../AppIcon/AppIcon";
import { IconContext } from "react-icons";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function NavBar() {
  const [state, setState] = useState<{ isOpened: boolean }>({
    isOpened: false,
  });
  // menu click handler
  const menuClickHandler = () => {
    if (state.isOpened) {
      setState({ isOpened: false });
      return;
    }
    setState({ isOpened: true });
  };
  return (
    <nav className={styles.navBarMobile}>
      <AppIcon />
      <p className={styles.appname}>samPay</p>
      <span className={styles.menuIconContainer} onClick={menuClickHandler}>
        <IconContext.Provider value={{ size: "2rem" }}>
          <HiOutlineMenuAlt3 className={styles.menuicon} />
        </IconContext.Provider>
      </span>
      {/* navLinks */}
      <NavLinks isOpened={state.isOpened} />
    </nav>
  );
}

export default NavBar;
