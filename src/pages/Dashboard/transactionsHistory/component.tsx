import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../types/interfaces/store";
import SingleTransaction from "../../../components/SingleTransaction/component";
import { TransHisProps } from "./interface";
import styles from "./styles.module.scss";

function TransactionsHistory() {
  const { transHistory } = useSelector<AppState, TransHisProps>(({ auth }) => ({
    transHistory: auth.client?.transactionsHistory!,
  }));
  // transactions History
  return (
    <section className={styles.Transactions}>
      <h4 className={styles.TransactionsDate}>Today 20-Jul-2020</h4>
      {transHistory.map((singleTrans) => {
        return <SingleTransaction transaction={singleTrans} />;
      })}
    </section>
  );
}

export default TransactionsHistory;
