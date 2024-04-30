import React, { FC } from 'react';
import { GetReceiverComState } from '../interface';
import styles from './viaemail.module.scss';

interface ViaEmailProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transferMoneyState: GetReceiverComState;
}

const ViaEmail: FC<ViaEmailProps> = ({ transferMoneyState, onChangeHandler }) => {
  return (
    <div className={styles.transferWithEmail}>
      {/* email input */}
      <div className={styles.email}>
        <input type="email" name="receiverEmail" value={transferMoneyState.receiverEmail} placeholder="Enter your email" onChange={onChangeHandler} />
      </div>
      {/* client image */}
      <div className={styles.Img}></div>
    </div>
  );
};

export default ViaEmail;
