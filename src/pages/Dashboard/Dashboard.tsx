import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentRoute } from "../../apis/system";
import styles from "./Dashboard.module.scss";
import TransferMoney from "./transferMoney/component";
import TransactionsHistory from "./transactionsHistory/component";
import { AppState } from "../../types/interfaces/store";
import { DashProps } from "./interface";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { client } = useSelector<AppState, DashProps>((state) => ({
    client: state.auth.client,
  }));
  // when component mount
  useEffect(() => {
    dispatch(SetCurrentRoute("DashBoard"));
  }, []);
  // return the ui
  return (
    <div className={styles.DashBoard}>
      <section className={styles.MainCard}>
        <h6>Your Balance</h6>
        <p className={styles.Balance}>{`\$${client!.account.balance}`}</p>
        <p className={styles.Account}>{`Saving A/C ${client!._id}`}</p>
      </section>
      <TransferMoney />
      <TransactionsHistory />
      <section className={styles.Cards}></section>
    </div>
  );
};

export default Dashboard;
