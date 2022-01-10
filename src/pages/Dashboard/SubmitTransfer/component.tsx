import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUniversity } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCurrentTransfer,
  hideSubmitTransModal,
  submitTransfer,
} from "../../../apis/transactions";
import { SubmitTransProps, SubmitTransState } from "./interface";
import { AppState, Client } from "../../../types/interfaces/store";
import { TransferStatus } from "../../../types/enums/transactions";
import { SubmitTransParms } from "../../../types/interfaces/trans_apis";
import TransLoading from "../../../components/TransLoading/TransLoading";
import { addReceiverToHistory } from "../../../apis/system";
// import DoneIcon from "../../../../public/icons/ok-1.1s-200px.svg";

const SubmitTrans = () => {
  // the component state
  const [state, setState] = useState<SubmitTransState>({
    amount: 0,
    isLoading: false,
  });
  // dispatch
  const dispatch = useDispatch();
  // get data from the redux store
  const { currentTransfer, isTransaferSubmited } = useSelector<
    AppState,
    SubmitTransProps
  >(({ transactions }) => ({
    currentTransfer: transactions.currentTransfer as Client,
    isTransaferSubmited: transactions.submitTransfer,
  }));
  // handle user inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update the state
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // hideModal
  const hideModal = () => {
    dispatch(hideSubmitTransModal());
  };
  // handle submition
  const handleSubmition = (e: React.FormEvent) => {
    e.preventDefault();
    // make loading indecator
    setState({
      ...state,
      isLoading: true,
    });
    // complete the transfer proccess by calling the api
    const transaction = {
      receiverPhone: currentTransfer!.phone,
      amount: Number(state.amount),
    } as SubmitTransParms;
    // call the api and dispatch an action to the redux store
    dispatch(submitTransfer(transaction));
    // add receiver to receivers history
    dispatch(
      addReceiverToHistory({
        name: currentTransfer.name,
        phoneNo: currentTransfer.phone as number,
        _id: currentTransfer._id,
        img: currentTransfer.avatar,
      })
    );
  };
  useEffect(() => {
    if (isTransaferSubmited === true) {
      setState({
        ...state,
        isLoading: false,
      });
      setTimeout(() => {
        dispatch(clearCurrentTransfer());
      }, 1500);
    }
  }, [isTransaferSubmited]);
  return (
    <section className={styles.ConfirmTransfer}>
      <div className={styles.Container}>
        {state.isLoading ? (
          ""
        ) : isTransaferSubmited ? (
          <div className={styles.doneIcon}>
            <img src="/icons/ok-1.1s-200px.svg" />
            <h1>Done</h1>
          </div>
        ) : (
          ""
        )}
        <div className={styles.Header}>
          <div className={styles.IMG}></div>
          <h3 className={styles.Name}>
            <span className={styles.firstName}>{currentTransfer.name}</span>
            <span className={styles.lastName}>Mustafa</span>
          </h3>
        </div>
        <div className={styles.Details}>
          <div className={styles.DetailsContainer}>
            <span>
              <FontAwesomeIcon icon={faUniversity} />
            </span>
            <h4>Omdurman Branch</h4>
          </div>
          <div className={styles.DetailsContainer}>
            <span>
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <h4>{currentTransfer!.phone}</h4>
          </div>
        </div>
        <div className={styles.Submit}>
          <input
            type="number"
            value={state.amount}
            name="amount"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmition}>
            {state.isLoading ? (
              <TransLoading />
            ) : isTransaferSubmited ? (
              "Done"
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

// export component and connect it to store
export default SubmitTrans;
