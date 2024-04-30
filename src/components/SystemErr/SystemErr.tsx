import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideGetReceiverErrMsg } from '../../apis/system';
import { AppState } from '../../types/interfaces/store';
import { FiAlertTriangle } from 'react-icons/fi';
import styles from './systemerr.module.scss';

const SystemErr = () => {
  const dispatch = useDispatch();
  // get error messge from redux store
  const getReceiverErrMsg = useSelector<AppState, string | null>((state) => state.system.getReceiverErr);
  // check for error message
  useEffect(() => {
    if (getReceiverErrMsg !== null) {
      setTimeout(() => {
        // dispatch hideGetReceiverErrMsg to hide error msg
        dispatch(hideGetReceiverErrMsg());
      }, 3000);
    }
  }, [getReceiverErrMsg]);
  return (
    <div className={styles.systemerr}>
      <div className={styles.mainDiv} style={{ display: getReceiverErrMsg ? 'flex' : 'none' }}>
        <IconContext.Provider value={{ color: 'white', size: '2rem' }}>
          <FiAlertTriangle />
        </IconContext.Provider>
        <p className={styles.errmessage}>{getReceiverErrMsg}</p>
      </div>
    </div>
  );
};

export default SystemErr;
