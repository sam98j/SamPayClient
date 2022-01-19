import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubmitTrans from "../../pages/Dashboard/SubmitTransfer/component";
import { TransferStatus } from "../../types/enums/transactions";
import { AppState } from "../../types/interfaces/store";
import { CurrentTransfer } from "../../types/interfaces/trans_reducer";
import SendMoneyMobile from "../SendMoneyMobile/SendMoneyMobile";
import styles from "./styles.module.scss";

function SendMoneyPanel() {
  const { currentTransfer } = useSelector<
    AppState,
    { currentTransfer: CurrentTransfer }
  >(({ transactions }) => ({
    currentTransfer: transactions.currentTransfer,
  }));
  const [isTrxReady, setIsTrxReady] = useState<boolean>(false);
  useEffect(() => {
    if (currentTransfer !== TransferStatus.TRANS_LOADING) {
      setIsTrxReady(true);
      return;
    }
    setIsTrxReady(false);
  }, [currentTransfer]);
  return (
    <div className={styles.sendMoneyPanel}>
      {isTrxReady ? <SubmitTrans /> : <SendMoneyMobile />}
    </div>
  );
}

export default SendMoneyPanel;
