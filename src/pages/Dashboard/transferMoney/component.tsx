import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceiver } from "../../../apis/transactions";
import TransLoading from "../../../components/TransLoading/TransLoading";
import { TransferStatus } from "../../../types/enums/transactions";
import { AppState } from "../../../types/interfaces/store";
import { CurrentTransfer } from "../../../types/interfaces/trans_reducer";
import { GetReceiverComState } from "./interface";
import styles from "./styles.module.scss";

function TransferMoney() {
  // local state of component
  const [state, setState] = useState<GetReceiverComState>({
    receiverPhone: "",
    isLoading: false,
  });
  // ref
  const btnRef = useRef<HTMLButtonElement>(null);
  // get data from the store
  const currentTransfer = useSelector<AppState, CurrentTransfer>(
    ({ transactions }) => transactions.currentTransfer
  );
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
  // component update and mount
  useEffect(() => {
    if (!state.receiverPhone) {
      btnRef.current!.disabled = true;
      return;
    }
    btnRef.current!.disabled = false;
  });
  // DO Transfer
  function Transfer(e: React.FormEvent) {
    // prevent default action of form
    e.preventDefault();
    // check
    if (!state.receiverPhone) {
      console.log(new Error("no phone entered"));
      return;
    }
    // get the receiver form the server
    dispatch(getReceiver(state.receiverPhone));
    // run the loading
    setState({
      ...state,
      isLoading: true,
    });
  }
  // whatch currentTransfer changes
  useEffect(() => {
    // if current transfer == transloading
    if (currentTransfer !== TransferStatus.TRANS_LOADING) {
      setState({
        ...state,
        isLoading: false,
      });
    }
  }, [currentTransfer]);
  return (
    <div className={styles.MakeTransaction}>
      <h4 className={styles.sectionName}>Quick Transfer</h4>
      {/* select transfer type */}
      <ul className={styles.transferTypesContainer}>
        <li>Via Account No</li>
        <li>Via Mobile No</li>
      </ul>
      {/* Transfer with phone number */}
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
            value={state.receiverPhone}
            placeholder="Enter receiver phone"
            onChange={inputHandler}
          />
        </div>
        {/* client image */}
        <div className={styles.Img}></div>
      </div>
      {/* Do tranfer btn */}
      <button onClick={Transfer} ref={btnRef} className={styles.transferBtn}>
        {state.isLoading ? <TransLoading /> : "Transfer"}
      </button>
    </div>
  );
}
// export component and connect it to the store
export default TransferMoney;
