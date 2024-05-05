import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { getReceiver } from '../../apis/transactions';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

const SendMoneyMobile = () => {
  const [receiverEmail, setReceiverEmail] = useState<string>('');
  // localization method
  const { t } = useTranslation();
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
      <div className={styles.inputArea}>
        <input
          type="email"
          placeholder={t('dashboardPage.transferMoneyMobile.reciverEmailFieldPlaceHolder')}
          value={receiverEmail}
          onChange={inputHandler}
        />
        <button
          type="submit"
          onClick={submitHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t('dashboardPage.transferMoneyMobile.sendBtn')}
        </button>
      </div>
    </div>
  );
};

export default SendMoneyMobile;
