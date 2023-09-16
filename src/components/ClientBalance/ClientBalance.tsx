import React from "react";
import styles from "./ClientBalance.module.scss";

export const ClientBalance: React.FC<{}> = () => {
  return (
    <div className={styles.ClientBalance}>
      {/* Widget Name */}
      <p className={styles.WidgetName}>Your Balance</p>
      {/* Balance Amount */}
      <div className={styles.BalanceAmount}>
        {/* Current Balance */}
        <p>$2300.90</p>
        {/* income indecator */}
        <p>&darr;10.5%</p>
        {/* expenses indecator */}
        <p>&uarr;90.3%</p>
      </div>
      {/* Widget Footer */}
      <div className={styles.WidgetFooter}>
        {/* Currency */}
        <span>
          <p>Currency</p>
          <p>SDG / SD Pound</p>
        </span>
        {/* Account Status */}
        <span>
          <p>Status</p>
          <p>Active</p>
        </span>
      </div>
    </div>
  );
};
