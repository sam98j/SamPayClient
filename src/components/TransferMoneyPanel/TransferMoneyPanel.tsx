import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmitTransfer from '../../pages/Dashboard/SubmitTransfer/SubmitTransfer';
import { TransferStatus } from '../../types/enums/transactions';
import { AppState } from '../../types/interfaces/store';
import { CurrentTransfer } from '../../types/interfaces/trans_reducer';
import TransferMoneyMobile from '../TransferMoneyMobile/TransferMoneyMobile';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './styles.module.scss';
import { transferMoneyMobie } from '../../apis/system';
import AppIcon from '../AppIcon/AppIcon';

function SendMoneyPanel() {
  // dispatch store method
  const dispatch = useDispatch();
  // data from store
  const { currentTransfer } = useSelector<AppState, { currentTransfer: CurrentTransfer }>(({ transactions }) => ({
    currentTransfer: transactions.currentTransfer,
  }));
  const [isTrxReady, setIsTrxReady] = useState<boolean>(false);
  useEffect(() => {
    // check if receiver is fetched correctly
    if (currentTransfer !== TransferStatus.TRANS_LOADING) {
      // this to show SubmitTransfer Component
      setIsTrxReady(true);
      return;
    }
    // this to show TransferMoneyMobile Component
    setIsTrxReady(false);
  }, [currentTransfer]);
  // handle close icon click
  const handleCloseIconClick = () => {
    dispatch(transferMoneyMobie(false));
  };
  return (
    <div className={styles.sendMoneyPanel}>
      {/* Close Pannel Icon */}
      <AiOutlineClose className={`${styles.icon} text-gray-500 bg-gray-200 rounded-full p-1 text-xl`} onClick={handleCloseIconClick} />
      {/* logo */}
      <div className={styles.brandsection}>
        <AppIcon />
        <p>SamPay</p>
      </div>
      {/* if current trx is ready then show submitTrans Component */}
      {isTrxReady ? <SubmitTransfer /> : <TransferMoneyMobile />}
    </div>
  );
}

export default SendMoneyPanel;
