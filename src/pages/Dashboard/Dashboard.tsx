import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetCurrentRoute } from "../../apis/system";
import styles from "./Dashboard.module.scss";
import TransferMoney from "./TransferMoney/TransferMoney";
import TransactionsHistory from "./TransactionsHistory/TransactionsHistory";
import ReceviersHistory from "./ReceviersHistory/ReceviersHistory";
import AccountCard from "./AccountCard/AccountCard";
import { ClientCard } from "../../components/ClientCard/ClientCard";
import { ClientBalance } from "../../components/ClientBalance/ClientBalance";

const Dashboard = () => {
  const dispatch = useDispatch();
  // when component mount
  useEffect(() => {
    dispatch(SetCurrentRoute("DashBoard"));
  }, []);
  // return the ui
  return (
    <div className={styles.DashBoard}>
      {/* Area Container */}
      <div className={styles.BigArea}>
        {/* to show account balance */}
        <AccountCard />
        {/* component to show all transactions that made by user */}
        <TransactionsHistory />
      </div>
      {/* Area Container */}
      <div className={styles.SmallArea}>
        {/* Card Componet */}
        <ClientCard />
        {/* Client Balance Widget */}
        <ClientBalance />
        {/* panel to quick send money */}
        <TransferMoney />
      </div>
    </div>
  );
};

export default Dashboard;
