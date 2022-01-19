import React, { useState } from "react";
import styles from "./styles.module.scss";
import AppIcon from "../../../assets/vectors/wallet.png";
import MenuIcon from "../../../assets/icons/menu-svgrepo-com.svg";
import NavLinks from "../../SideBar/navLinks/NavLinks";

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
      <img src={AppIcon} alt="" />
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