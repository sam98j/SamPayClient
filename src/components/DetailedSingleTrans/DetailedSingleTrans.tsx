import React from 'react';
import styles from './detailedsingletrans.module.scss';
import { IconContext } from 'react-icons';
import { BiCommentDetail } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { AppState } from '../../types/interfaces/store';
import { DetailedSingleTrans } from '../../types/interfaces/system_api';

const DetailedSingleTransaction = () => {
  // get data from store
  const { amount, date, name, note } = useSelector<AppState, DetailedSingleTrans>(({ system }) => system.detailedSingleTrans!);
  return (
    <div className={styles.detailedsingletrans}>
      {/* header container */}
      <div className={styles.header}>
        {/* receiver avatar */}
        <span className={styles.avatar}></span>
        {/* receiver name and date */}
        <span className={styles.name_date}>
          <p className="">{name}</p>
          <p>{date}</p>
        </span>
        {/* amount */}
        <p className={styles.amount}>{`$${amount}`}</p>
      </div>
      {/* detailed single trans body */}
      <div className={styles.body}>
        {/* transaction note */}
        <p className={styles.note}>
          <span className={styles.icon}>
            <IconContext.Provider value={{ color: 'black' }}>
              <BiCommentDetail />
            </IconContext.Provider>
          </span>
          <span className={styles.text}>{note}</span>
        </p>
        {/* transaction id */}
        <p className={styles.transId}>
          {/* icon */}
          <span className={styles.icon}>
            <IconContext.Provider value={{ color: 'black' }}>{/* <AiOutlineNumber /> */}</IconContext.Provider>
          </span>
          {/* text */}
          <span className={styles.text}>uuid_trans90349$io34</span>
        </p>
      </div>
    </div>
  );
};

export default DetailedSingleTransaction;
