import React from "react";
import "react-credit-cards/lib/styles.scss";
import styles from "./ClientCard.module.scss";
import CardChipIcon from "./chip.png";

export const ClientCard: React.FC<{}> = () => {
  return (
    <div className={styles.ClientCard}>
      {/* card header */}
      <div className={styles.CardHeader}>
        {/* card chip icon */}
        <span>
          <img src={CardChipIcon} alt="" />
        </span>
        {/* card title */}
        <p>SamPay</p>
      </div>
      <div className={styles.CardNumber}>
        <p>84398989439849949384</p>
      </div>
      <div className={styles.CardFooter}>
        {/* Card Holder Name */}
        <p className={styles.CardHolderName}>HosamAlden Mustafa</p>
        {/* Card Validity */}
        <p className={styles.CardValidity}>09/25</p>
      </div>
    </div>
  );
};
