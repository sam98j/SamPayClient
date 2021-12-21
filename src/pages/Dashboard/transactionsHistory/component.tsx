import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../types/interfaces/store";
import SingleTransaction from "../../../components/SingleTransaction/component";
import { TransHisProps } from "./interface";
import styles from "./styles.module.scss";
import DetailedSingleTrans from "../../../components/DetailedSingleTrans/DetailedSingleTrans";

function TransactionsHistory() {
  const { transHistory, detailedsingletrans } = useSelector<
    AppState,
    TransHisProps
  >(({ auth, system }) => ({
    transHistory: auth.client?.transactionsHistory!,
    detailedsingletrans: system.detailedSingleTrans,
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
