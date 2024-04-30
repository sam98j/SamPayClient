import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransferMehod } from '../../../apis/system';
import { getReceiver } from '../../../apis/transactions';
import TransLoading from '../../../components/TransLoading/TransLoading';
import { TransferMethods } from '../../../types/enums/system';
import { TransferStatus } from '../../../types/enums/transactions';
import { AppState } from '../../../types/interfaces/store';
import { CurrentTransfer } from '../../../types/interfaces/trans_reducer';
import { GetReceiverComState } from './interface';
import styles from './styles.module.scss';
import ViaEmail from './ViaEmail/ViaEmail';
import ViaPhoneNo from './ViaPhoneNo/ViaPhoneNo';

function TransferMoney() {
  // local state of component
  const [state, setState] = useState<GetReceiverComState>({
    receiverPhone: '',
    isLoading: false,
    receiverEmail: '',
  });
  // ref
  const btnRef = useRef<HTMLButtonElement>(null);
  // get TransferMethod from the store
  const transferMethod = useSelector<AppState, TransferMethods>((state) => state.system.transferMethod);
  // get data from the store
  const currentTransfer = useSelector<AppState, CurrentTransfer>(({ transactions }) => transactions.currentTransfer);
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
    if (!state.receiverPhone && !state.receiverEmail) {
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
    if (!state.receiverPhone && !state.receiverEmail) {
      console.log(new Error('no phone entered'));
      return;
    }
    const receiverContact = transferMethod === TransferMethods.VIA_EMAIL ? state.receiverEmail : state.receiverPhone;
    // get the receiver form the server
    dispatch(getReceiver(receiverContact));
    // run the loading
    setState({
      ...state,
      isLoading: true,
    });
  }
  // select transferMethod Handler
  function selectTransferMethodHandler(e: React.MouseEvent<HTMLLIElement>) {
    const transferMethod = e.currentTarget.value as TransferMethods;
    dispatch(selectTransferMehod(transferMethod));
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
      <p className={styles.sectionName}>Quick Transfer</p>
      {/* select transfer type */}
      <ul className={styles.transferTypesContainer}>
        <li
          onClick={selectTransferMethodHandler}
          value={TransferMethods.VIA_EMAIL}
          data-active={transferMethod === TransferMethods.VIA_EMAIL ? 'true' : 'false'}
        >
          Via Email
        </li>
        <li
          onClick={selectTransferMethodHandler}
          value={TransferMethods.VIA_MOBILE_NO}
          data-active={transferMethod === TransferMethods.VIA_EMAIL ? 'false' : 'true'}
        >
          Via Mobile No
        </li>
      </ul>
      {/* determine transferMethod */}
      {transferMethod === TransferMethods.VIA_EMAIL ? (
        <ViaEmail transferMoneyState={state} onChangeHandler={inputHandler} />
      ) : (
        <ViaPhoneNo transferMoneyState={state} onChangeHandler={inputHandler} />
      )}
      {/* Do tranfer btn */}
      <button onClick={Transfer} ref={btnRef} className={styles.transferBtn}>
        {state.isLoading ? <TransLoading /> : 'Make Transfer'}
      </button>
    </div>
  );
}
// export component and connect it to the store
export default TransferMoney;
