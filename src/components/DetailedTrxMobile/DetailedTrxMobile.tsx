import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { hideDetailedSingleTrans } from "../../apis/system";
import { AppState } from "../../types/interfaces/store";
import { DetailedSingleTrans } from "../../types/interfaces/system_api";
import AppIcon from "../AppIcon/AppIcon";
import styles from "./detailedtrxmobile.module.scss";
import { motion } from "framer-motion";

const DetailedTrxMobile = () => {
  const dispatch = useDispatch();
  // get data from store
  const { amount, date, transId, name } = useSelector<
    AppState,
    DetailedSingleTrans
  >(({ system }) => system.detailedSingleTrans!);
  // handle close menu click
  const closePanelHandler = () => {
    dispatch(hideDetailedSingleTrans());
  };
  return (
    <motion.div className={styles.detailedtrxmobile}>
      {/* header */}
      <div className={styles.header}>
        {/* section name */}
        <p className={styles.section_name}>Trx. Details</p>
        {/* close icon */}
        <p className={styles.closeicon} onClick={closePanelHandler}>
          <IconContext.Provider value={{ color: "lighgray" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </p>
      </div>
      {/* trx amount and status */}
      <div className={styles.amount}>
        <p className={styles.trxamount}>$ {amount}</p>
        <p className={styles.trxstatus}>Completed</p>
      </div>
      {/* body */}
      <div className={styles.body}>
        {/* data container */}
        <div className={styles.datacontainer}>
          <p className={styles.dataname}>date</p>
          <p className={styles.datavalue}>{date}</p>
        </div>
        {/* data container */}
        <div className={styles.datacontainer}>
          <p className={styles.dataname}>trxId</p>
          <p className={styles.datavalue}>{transId}</p>
        </div>
        {/* data container */}
        <div className={styles.datacontainer}>
          <p className={styles.dataname}>receiver</p>
          <p className={styles.datavalue}>{name}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailedTrxMobile;
