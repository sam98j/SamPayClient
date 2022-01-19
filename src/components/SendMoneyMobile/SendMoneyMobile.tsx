import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { getReceiver } from "../../apis/transactions";
import styles from "./styles.module.scss";

const SendMoneyMobile = () => {
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const dispatch = useDispatch();
  // input Handler
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiverPhone(e.target.value);
  };
  // submit Handler
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (receiverPhone) {
      dispatch(getReceiver(receiverPhone));
    }
  };
  return (
    <div className={styles.sendMoneyMobile}>
      <p>Send Money</p>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Enter Receiver Number"
          value={receiverPhone}
          onChange={inputHandler}
        />
        <button type="submit" onClick={submitHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMoneyMobile;
