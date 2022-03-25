import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetCurrentRoute } from "../../apis/system";
import styles from "./Dashboard.module.scss";
import TransferMoney from "./TransferMoney/TransferMoney";
import TransactionsHistory from "./TransactionsHistory/TransactionsHistory";
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
      {/* to show account balance */}
      <AccountCard />
      {/* panel to quick send money */}
      <TransferMoney />
      {/* component to show all transactions that made by user */}
      <TransactionsHistory />
      {/* show recents receivers */}
      <ReceviersHistory />
    </div>
  );
};

export default Dashboard;
