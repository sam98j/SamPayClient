import React from "react";
import styles from "./AppName.module.scss";
import Logo from "../../assets/vectors/wallet.png";

const AppName = () => {
  return (
    <h2 className={styles.AppName}>
      <img src={Logo} alt="" />
      <span>samPay</span>
    </h2>
  );
};

export default AppName;
