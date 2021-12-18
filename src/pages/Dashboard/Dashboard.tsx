import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetCurrentRoute } from "../../apis/system";
import styles from "./Dashboard.module.scss";
import TransferMoney from "./transferMoney/component";
import TransactionsHistory from "./transactionsHistory/component";
import ReceviersHistory from "./ReceviersHistory/ReceviersHistory";
import AccountCard from "./AccountCard/AccountCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  // when component mount
  useEffect(() => {
    dispatch(SetCurrentRoute("DashBoard"));
  }, []);
  // return the ui
  return (
    <div className={styles.DashBoard}>
      <AccountCard />
      <TransferMoney />
      <TransactionsHistory />
      <ReceviersHistory />
    </div>
  );
};

export default Dashboard;
