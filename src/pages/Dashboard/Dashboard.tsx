import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetCurrentRoute } from "../../apis/system";
import styles from "./Dashboard.module.scss";
import TransferMoney from "./transferMoney/component";
import TransactionsHistory from "./transactionsHistory/component";
import ReceviersHistory from "./ReceviersHistory/ReceviersHistory";
import AccountCard from "./AccountCard/AccountCard";
import { useParams, useHistory, useLocation } from "react-router";

const Dashboard = () => {
  const params = useParams();
  const {} = useHistory();
  const { search, key } = useLocation();
  console.log(params);
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
      {/* visble on mobile */}
      <p className={styles.trxHisTitle}>Trx. History</p>
      <TransactionsHistory />
      <ReceviersHistory />
    </div>
  );
};

export default Dashboard;
