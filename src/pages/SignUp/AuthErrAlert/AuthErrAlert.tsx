import React, { FC, useEffect } from 'react';
import styles from './autherralert.module.scss';
import { motion } from 'framer-motion';
import { AuthErrAlertProps } from './interface';
import { useDispatch } from 'react-redux';
import { clearAuthErrMsg } from '../../../apis/auth';

const AuthErrAlert: FC<AuthErrAlertProps> = ({ msg }) => {
  // dispatch function
  const dispatch = useDispatch();
  // component did mount
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearAuthErrMsg());
    }, 2000);
  });
  return (
    <motion.div initial={{ opacity: 0.7 }} animate={{ y: '20px', opacity: 1 }} exit={{ y: '-100px' }} className={styles.errAlert}>
      {msg}
    </motion.div>
  );
};

export default AuthErrAlert;
