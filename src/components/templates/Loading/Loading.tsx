import React from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
  return <div className={styles.Loading}>
    <div className={styles.loader}></div>
  </div>;
};

export default Loading;
