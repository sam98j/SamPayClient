import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideIncomingTransAlert } from '../../apis/system';
import { AppState } from '../../types/interfaces/store';
import styles from './incometransalert.module.scss';
import { IncomingTransAlertProps } from './interface';
import { IconContext } from 'react-icons';
import { FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

const InComeTransAlert = () => {
  const dispatch = useDispatch();
  // the incoming message
  const { incomingTransAlert } = useSelector<AppState, IncomingTransAlertProps>(({ system }) => ({ incomingTransAlert: system.incomingTransAlert }));
  useEffect(() => {
    // hide notification message after 3 seconds
    setTimeout(() => {
      dispatch(hideIncomingTransAlert());
    }, 3000);
  });
  return (
    <motion.div
      animate={{ y: 10 }}
      transition={{
        y: { type: 'keyframes', stiffness: 100 },
      }}
      className={styles.inComeTransAlert}
    >
      <span className={styles.avatar}></span>
      <div className={styles.container}>
        <p className={styles.sender}>{incomingTransAlert?.sender}</p>
        <p className={styles.date}>Now</p>
      </div>
      <p className={styles.amount}>
        <span className={styles.incomeIcon}>
          <IconContext.Provider value={{ color: 'green', size: '1.5rem' }}>
            <FiArrowDown />
          </IconContext.Provider>{' '}
        </span>
        $ {incomingTransAlert?.transAmount}
      </p>
    </motion.div>
  );
};

export default InComeTransAlert;
