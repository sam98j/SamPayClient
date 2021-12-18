import React from "react";
import { RiNotification2Line } from "react-icons/ri";
import { IconContext } from "react-icons/lib";
import styles from "./notifications.module.scss";
import { useSelector } from "react-redux";
import { AppState } from "../../types/interfaces/store";

const Notifications = () => {
  const { notifications } = useSelector<AppState, { notifications: number }>(
    ({ system }) => ({ notifications: system.notifications.length })
  );
  return (
    <span className={styles.notifications}>
      <span className={styles.notificationsCount}>{notifications}</span>
      <IconContext.Provider value={{ color: "black" }}>
        <RiNotification2Line />
      </IconContext.Provider>
    </span>
  );
};

export default Notifications;
