import React from "react";
import styles from "./SingleTransaction.module.scss";

const SingleTransaction = () => {
  return (
    <div className={styles.SingleTransaction}>
      <div className={styles.Img}></div>
      <div className={styles.container}>
        <h3>Transfer To Hossam</h3>
        <p>Some Discription</p>
      </div>
      <h4>$9,000</h4>
    </div>
  );
};

export default SingleTransaction;
