import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, SingleTrans } from '../../../types/interfaces/store';
import SingleTransaction from '../../../components/SingleTransaction/component';
import { TransHisProps } from './interface';
import styles from './styles.module.scss';
import DetailedSingleTrans from '../../../components/DetailedSingleTrans/DetailedSingleTrans';
import moment from 'moment';

interface Section {
  title: string;
  trxs: SingleTrans[];
}

function TransactionsHistory() {
  const { transHistory, detailedsingletrans } = useSelector<AppState, TransHisProps>(({ auth, system }) => ({
    transHistory: auth.client?.transactionsHistory!,
    detailedsingletrans: system.detailedSingleTrans,
  }));
  // state
  const [trxSortedByDate, settrxSortedByDate] = useState<{
    sortiedByDate: Section[];
  }>({ sortiedByDate: [] });
  // transactions dates
  const sortTrxsHisByDate = () => {
    const datesArray = Array.from(new Set(transHistory.map((trx) => moment(trx.date).format('YYYY-MMM-DD'))));
    let sections: Section[] = datesArray.map((date) => ({
      title: date,
      trxs: transHistory.filter((trx) => {
        const trxDate = moment(trx.date).format('YYYY-MMM-DD'); // 21
        if (trxDate === date) {
          return true;
        }
      }),
    }));
    settrxSortedByDate({ sortiedByDate: sections });
  };

  useEffect(() => {
    sortTrxsHisByDate();
  }, [transHistory]);
  // transactions History
  return (
    <section className={styles.Transactions}>
      {/* section name */}
      <p className={styles.sectionname}>Transactions History</p>
      {/* transactions */}
      {trxSortedByDate.sortiedByDate.map((ele) => (
        <div>
          <h4 className={styles.TransactionsDate}>{ele.title}</h4>
          {ele.trxs.map((singleTrans) => {
            return <SingleTransaction transaction={singleTrans} />;
          })}
        </div>
      ))}
    </section>
  );
}

export default TransactionsHistory;
