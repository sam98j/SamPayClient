import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getReceiver } from "../../../apis/transactions";
import { GetReceiverComState } from "./interface";
import styles from "./styles.module.scss";

function TransferMoney() {
  // local state of component
  const [state, setState] = useState<GetReceiverComState>({
    receiverPhone: "",
  });
  // dispatch store function
  const dispatch = useDispatch();
  // handle inputs of user
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // update the state of component
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  // DO Transfer
  function Transfer(e: React.FormEvent) {
    // prevent default action of form
    e.preventDefault();
    // get the receiver form the server
    dispatch(getReceiver(state.receiverPhone));
  }
  return (
    <section className={styles.MakeTransaction}>
      <h4>Quick Transfer</h4>
      <ul>
        <li>Via Account No</li>
        <li>Via Mobile No</li>
      </ul>
      <div className={styles.TransferWithPhone}>
        <div className={styles.Country}>
          <span></span>
          <span>+249</span>
        </div>
        <div className={styles.Phone}>
          <input
            type="number"
            name="receiverPhone"
            value={state.receiverPhone}
            onChange={inputHandler}
          />
        </div>
        <div className={styles.Img}></div>
      </div>
      <button onClick={Transfer}>Transfer</button>
    </section>
  );
}
// export component and connect it to the store
export default TransferMoney;
