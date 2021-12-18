import React from "react";
import { useSelector } from "react-redux";
import { AppState, Client } from "../../../types/interfaces/store";
import styles from "./accountcard.module.scss";

const AccountCard = () => {
  // get data from redux store
  const { account, _id } = useSelector<AppState, Client>(
    ({ auth }) => auth.client!
  );
  // return template
  return (
    <div className={styles.accountCard}>
      <h6>Your Balance</h6>
      <p className={styles.Balance}>{`\$${account.balance}`}</p>
      <p className={styles.Account}>{`Saving A/C ${_id}`}</p>
    </div>
  );
};

export default AccountCard;
