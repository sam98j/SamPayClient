import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitTransfer from "../../pages/Dashboard/SubmitTransfer/SubmitTransfer";
import { TransferStatus } from "../../types/enums/transactions";
import { AppState } from "../../types/interfaces/store";
import { CurrentTransfer } from "../../types/interfaces/trans_reducer";
import TransferMoneyMobile from "../TransferMoneyMobile/TransferMoneyMobile";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles.module.scss";
import { useHistory } from "react-router";
import { transferMoneyMobie } from "../../apis/system";

function SendMoneyPanel() {
  // dispatch store method
  const dispatch = useDispatch();
  // data from store
  const { currentTransfer } = useSelector<
    AppState,
    { currentTransfer: CurrentTransfer }
  >(({ transactions }) => ({
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
      <IconContext.Provider value={{ color: "gray" }}>
        <AiOutlineClose
          className={styles.icon}
          onClick={handleCloseIconClick}
        />
      </IconContext.Provider>
      {/* if current trx is ready then show submitTrans Component */}
      {isTrxReady ? <SubmitTransfer /> : <TransferMoneyMobile />}
    </div>
  );
}

export default SendMoneyPanel;
