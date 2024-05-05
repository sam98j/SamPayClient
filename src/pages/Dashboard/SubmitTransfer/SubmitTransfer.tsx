import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { RiBankFill, RiPhoneLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentTransfer, hideSubmitTransModal, submitTransfer } from '../../../apis/transactions';
import { SubmitTransProps, SubmitTransState } from './interface';
import { AppState } from '../../../types/interfaces/store';
import { Receiver, SubmitTransParms } from '../../../types/interfaces/trans_apis';
import TransLoading from '../../../components/TransLoading/TransLoading';
import { addReceiverToHistory } from '../../../apis/system';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SubmitTransfer = () => {
  const { push } = useHistory();
  // localization method
  const { t } = useTranslation();
  // the component state
  const [state, setState] = useState<SubmitTransState>({
    amount: 0,
    isLoading: false,
  });
  // dispatch
  const dispatch = useDispatch();
  // get data from the redux store
  const { currentTransfer, isTransaferSubmited } = useSelector<AppState, SubmitTransProps>(({ transactions }) => ({
    currentTransfer: transactions.currentTransfer as Receiver,
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
  const hideModal = () => dispatch(hideSubmitTransModal());
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
      receiverContact: currentTransfer!.contact,
      amount: Number(state.amount),
    } as SubmitTransParms;
    // call the api and dispatch an action to the redux store
    dispatch(submitTransfer(transaction));
    // add receiver to receivers history
    dispatch(
      addReceiverToHistory({
        name: currentTransfer.name,
        phoneNo: Number(currentTransfer.phone),
        _id: currentTransfer._id,
        img: currentTransfer.avatar,
        email: currentTransfer.contact,
      }),
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
        push('/dashboard');
      }, 1500);
    }
  }, [isTransaferSubmited]);
  return (
    <section className={styles.ConfirmTransfer}>
      {/* Main Container */}
      <div className={styles.Container}>
        {state.isLoading ? (
          ''
        ) : isTransaferSubmited ? (
          <div className={styles.doneIcon}>
            <img src="/icons/ok-1.1s-200px.svg" />
            <h1>Done</h1>
          </div>
        ) : (
          ''
        )}
        <div className={styles.Header}>
          {/* client avatar */}
          <div className={styles.IMG}>
            <img src={currentTransfer.avatar} alt="" />
          </div>
          {/* Client Name */}
          <h3 className={styles.Name}>
            <span className={styles.firstName}>{currentTransfer.name}</span>
            <span className={styles.lastName}>Mustafa</span>
          </h3>
        </div>
        {/* Client Details */}
        <div className={styles.Details}>
          {/* Details Container */}
          <div className={styles.DetailsContainer}>
            <RiBankFill />
            <h4>Omdurman Branch</h4>
          </div>
          <div className={styles.DetailsContainer}>
            <RiPhoneLine />
            <h4>0997545755</h4>
          </div>
        </div>
        {/* Submit Btn */}
        <div className={styles.Submit}>
          <input type="number" value={state.amount} name="amount" onChange={handleChange} />
          <button
            type="submit"
            onClick={handleSubmition}
            className="text-white bg-blue-700 w-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {state.isLoading ? <TransLoading /> : isTransaferSubmited ? 'Done' : t('dashboardPage.transferMoneyMobile.sendBtn')}
          </button>
        </div>
      </div>
    </section>
  );
};

// export component and connect it to store
export default SubmitTransfer;
