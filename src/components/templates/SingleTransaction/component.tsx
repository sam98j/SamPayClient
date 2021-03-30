import React from "react";
import { comProps } from "./interface";
import styles from "./styles.module.scss";

const SingleTransaction: React.FC<comProps> = (props) => {
  const {transaction} = props;
  const {receiver, amount} = transaction;
  return (
    <div className={styles.SingleTransaction}>
      <div className={styles.Img}></div>
      <div className={styles.container}>
        <h3>Transfer To {receiver.name}</h3>
        <p>Some Discription</p>
      </div>
      <h4>${amount}</h4>
    </div>
  );
};

export default SingleTransaction;
