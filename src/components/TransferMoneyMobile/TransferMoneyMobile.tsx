import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { getReceiver } from "../../apis/transactions";
import styles from "./styles.module.scss";

const SendMoneyMobile = () => {
  const [receiverEmail, setReceiverEmail] = useState<string>("");
  const dispatch = useDispatch();
  // input Handler
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // fill the component state with email entered by user
    setReceiverEmail(e.target.value);
  };
  // submit Handler
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    // check if email input is not empty
    if (receiverEmail) {
      dispatch(getReceiver(receiverEmail));
    }
  };
  return (
    <div className={styles.sendMoneyMobile}>
      {/* section name */}
      <p>Send Money</p>
      <div className={styles.inputArea}>
        <input
          type="email"
          placeholder="Enter Receiver Email"
          value={receiverEmail}
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
