import React from 'react';
import { useSelector } from 'react-redux';
import NotificationEle from '../../components/NotificationEle/NotificationEle';
import { AppState } from '../../types/interfaces/store';
import styles from './notifications.module.scss';
import { ReceiveMoneyNotification } from '../../types/interfaces/trans_apis';

const NotificationsMenu = () => {
  const notifications = useSelector<AppState, ReceiveMoneyNotification[]>(({ system }) => system.notifications);
  return (
    <div className={styles.notifications}>
      <p className={styles.sectionname}>Notifications</p>
      {/* notification scrollable are */}
      <div className={styles.notificationsarea}>
        {/* if no notifications */}
        {notifications.length ? '' : <p>No notifications right now</p>}
        {notifications.map((ele) => (
          <NotificationEle notificationEle={ele} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsMenu;
