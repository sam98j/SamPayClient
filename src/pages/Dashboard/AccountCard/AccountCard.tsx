import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Client } from '../../../types/interfaces/store';
import styles from './accountcard.module.scss';
import { transferMoneyMobie } from '../../../apis/system';
import { useTranslation } from 'react-i18next';

const AccountCard = () => {
  // dispatch store method
  const dispatch = useDispatch();
  // localization method
  const { t } = useTranslation();
  // get data from store
  const { account, _id } = useSelector<AppState, Client>(({ auth }) => auth.client!);
  // send money Handler
  const sendMoneyMobileHandler = () => {
    dispatch(transferMoneyMobie(true));
  };
  // return template
  return (
    <div className={`${styles.accountCard} shadow-main rounded-2xl`}>
      <p className="text-xl text-gray-400">{t('dashboardPage.currentBalance')}</p>
      <p className={`${styles.Balance} text-5xl font-black`}>{`\$${account.balance}`}</p>
      <p className={styles.Account}>{`Saving A/C ${_id}`}</p>
      {/* mobile screens, send moeny btn */}
      <div className={styles.sendMoneyBtn} onClick={sendMoneyMobileHandler}>
        <div className="bg-blue-500 p-5 rounded-full">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.75778 6.14799C6.84443 5.77187 6.0833 5.45843 5.49196 5.30702C4.91915 5.16036 4.18085 5.07761 3.63766 5.62862C3.09447 6.17962 3.18776 6.91666 3.34259 7.48732C3.50242 8.07644 3.8267 8.83302 4.21583 9.7409L4.86259 11.25H10C10.4142 11.25 10.75 11.5858 10.75 12C10.75 12.4142 10.4142 12.75 10 12.75H4.8626L4.21583 14.2591C3.8267 15.167 3.50242 15.9236 3.34259 16.5127C3.18776 17.0833 3.09447 17.8204 3.63766 18.3714C4.18085 18.9224 4.91915 18.8396 5.49196 18.693C6.0833 18.5416 6.84443 18.2281 7.75777 17.852L19.1997 13.1406C19.4053 13.0561 19.6279 12.9645 19.7941 12.867C19.944 12.779 20.3434 12.5192 20.3434 12C20.3434 11.4808 19.944 11.221 19.7941 11.133C19.6279 11.0355 19.4053 10.9439 19.1997 10.8594L7.75778 6.14799Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
