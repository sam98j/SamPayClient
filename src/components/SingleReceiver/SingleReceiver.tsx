import React from "react";
import { SingleReceiverProps } from "./interface";
import styles from "./singlereceiver.module.scss";

const SingleReceiver: React.FC<SingleReceiverProps> = (props) => {
  const { date, name } = props.element;
  return (
    <div className={styles.singleReceiver}>
      {/* receiver img */}
      <span className={styles.img}></span>
      {/* receiver name and date*/}
      <span className={styles.details}>
        <p className={styles.name}>{name}</p>
        <p className={styles.date}>{date}</p>
      </span>
      {/* send again button */}
      <button className={styles.sendBtn}>send</button>
    </div>
  );
};

export default SingleReceiver;
