import React from "react";
import { NotificationEleProps } from "./interface";
import styles from "./notificationele.module.scss";

const NotificationEle: React.FC<NotificationEleProps> = (props) => {
  const { sender, transAmount } = props.notificationEle;
  return (
    <div className={styles.notification}>
      {/* avatar */}
      <span className={styles.avatar}></span>
      {/* notification message */}
      <p className={styles.message}>
        {`You received $${transAmount} from ${sender}`}
      </p>
    </div>
  );
};

export default NotificationEle;
