import React, { useState } from "react";
import styles from "./styles.module.scss";
import MenuIcon from "../../../assets/icons/menu-svgrepo-com.svg";
import NavLinks from "../../SideBar/navLinks/NavLinks";
import AppIcon from "../../AppIcon/AppIcon";

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
      <p>samPay</p>
      <span className={styles.menuIconContainer} onClick={menuClickHandler}>
        <img src={MenuIcon} alt="" />
      </span>
      {/* navLinks */}
      <NavLinks height={state.isOpened ? "initial" : "0"} />
    </nav>
  );
}

export default NavBar;
