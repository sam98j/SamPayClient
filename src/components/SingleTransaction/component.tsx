import React, { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideDetailedSingleTrans,
  showDetailedSingleTrans,
} from "../../apis/system";
import { AppState, SingleTrans } from "../../types/interfaces/store";
import { DetailedSingleTrans } from "../../types/interfaces/system_api";
import { SingleTransProps } from "./interface";
import styles from "./styles.module.scss";

const SingleTransaction: React.FC<SingleTransProps> = (props) => {
  const { receiver, amount, date, note } = props.transaction;
  // get detailed single trans from store
  const detailedSingleTrans = useSelector<AppState, DetailedSingleTrans>(
    ({ system }) => {
      return system.detailedSingleTrans!;
    }
  );
  // dispatch store function
  const dispatch = useDispatch();
  // handle mouse leave
  const handleMouseLeave = () => {
    // check for detailed single trans
    if (detailedSingleTrans !== null) {
      // dispatch an action
      dispatch(hideDetailedSingleTrans());
    }
  };
  // handle mouse over
  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    // check if detailedSingleTrans = null
    if (detailedSingleTrans === null) {
      const detailedSingleTrans = {
        date,
        name: receiver.name,
        amount: Number(amount),
        avatar: receiver.avatar,
        note,
        transId: "transactio_uuid",
      } as DetailedSingleTrans;
      // dispatch an action to the store
      dispatch(showDetailedSingleTrans(detailedSingleTrans));
    }
  };
  return (
    <div
      className={styles.singleTransaction}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.img}></div>
      <div className={styles.container}>
        <h3>Transfer To {receiver.name}</h3>
        <p className={styles.discription}>Some Discription</p>
      </div>
      <h4>${amount}</h4>
    </div>
  );
};

export default SingleTransaction;
