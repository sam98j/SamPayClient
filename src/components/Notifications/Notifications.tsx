import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import styles from "./notifications.module.scss";
import { useSelector } from "react-redux";
import { AppState } from "../../types/interfaces/store";

const Notifications = () => {
  const { notifications } = useSelector<AppState, { notifications: number }>(
    ({ system }) => ({
      notifications: system.notifications.filter((ele) => ele.seen === false)
        .length,
    })
  );
  return (
    <span className={styles.notifications}>
      <span className={styles.notificationsCount}>{notifications}</span>
      <IconContext.Provider value={{ color: "black", size: "20px" }}>
        <IoNotificationsOutline />
      </IconContext.Provider>
    </span>
  );
};

export default Notifications;
