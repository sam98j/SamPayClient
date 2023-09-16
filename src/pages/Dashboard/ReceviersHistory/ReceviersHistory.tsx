// @ts-ignore
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";
import SingleReceiver from "../../../components/SingleReceiver/SingleReceiver";
import { PagesNames } from "../../../types/enums/locales/PagesNames";
import { AppState } from "../../../types/interfaces/store";
import { ReceiversHistoryEle } from "../../../types/interfaces/system_api";
import { ReceiversHistoryStrings } from "./Locales/interface";
import styles from "./receviershistory.module.scss";
const ReceviersHistory = () => {
  const receiversHistory = useSelector<AppState, ReceiversHistoryEle[]>(
    ({ system }) => system.receiversHistory
  );
  return (
    <div className={styles.receviershistory}>
      <p className={styles.recentBeneficiaries}>
        {t(
          `${PagesNames.RECEIVERS_HISTORY_WIDGET}.${ReceiversHistoryStrings.WIDGET_TITLE}`
        )}
      </p>
      {receiversHistory!.map((ele) => {
        return <SingleReceiver element={ele} />;
      })}
      {receiversHistory.length === 0 ? (
        <h1 className={styles.nodata}>
          {t(
            `${PagesNames.RECEIVERS_HISTORY_WIDGET}.${ReceiversHistoryStrings.EMPTY_HISTORY_MSG}`
          )}
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReceviersHistory;
