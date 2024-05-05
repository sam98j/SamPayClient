import React from 'react';
import { useSelector } from 'react-redux';
import SingleReceiver from '../../../components/SingleReceiver/SingleReceiver';
import { AppState } from '../../../types/interfaces/store';
import { ReceiversHistoryEle } from '../../../types/interfaces/system_api';
import styles from './receviershistory.module.scss';
import { useTranslation } from 'react-i18next';
const ReceviersHistory = () => {
  // localization method
  const { t } = useTranslation();
  const receiversHistory = useSelector<AppState, ReceiversHistoryEle[]>(({ system }) => system.receiversHistory);
  return (
    <div className={styles.receviershistory}>
      <p className={styles.recentBeneficiaries}>{t('dashboardPage.recentBeneficiaries')}</p>
      {receiversHistory!.map((ele) => {
        return <SingleReceiver element={ele} />;
      })}
      {receiversHistory.length === 0 ? <h1 className={styles.nodata}>No Data</h1> : ''}
    </div>
  );
};

export default ReceviersHistory;
