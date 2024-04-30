import React, { FC } from 'react';
import { GetReceiverComState } from '../interface';
import styles from './viaphoneno.module.scss';

interface ViaPhoneNoProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transferMoneyState: GetReceiverComState;
}

const ViaPhoneNo: FC<ViaPhoneNoProps> = ({ onChangeHandler, transferMoneyState }) => {
  return (
    <div className={styles.TransferWithPhone}>
      {/* select country */}
      <div className={styles.Country}>
        <span></span>
        <span>+249</span>
      </div>
      {/* phone numbrer input */}
      <div className={styles.Phone}>
        <input
          type="number"
          name="receiverPhone"
          value={transferMoneyState.receiverPhone}
          placeholder="Enter receiver phone"
          onChange={onChangeHandler}
        />
      </div>
      {/* client image */}
      <div className={styles.Img}></div>
    </div>
  );
};

export default ViaPhoneNo;
