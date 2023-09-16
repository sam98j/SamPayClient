import React, { FC } from "react";
import { PagesNames } from "../../../../types/enums/locales/PagesNames";
import { GetReceiverComState } from "../interface";
import { TransferMoneyStrings } from "../Locales/interface";
import styles from "./viaemail.module.scss";
// @ts-ignore
import { t } from "i18next";

interface ViaEmailProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transferMoneyState: GetReceiverComState;
}

const ViaEmail: FC<ViaEmailProps> = ({
  transferMoneyState,
  onChangeHandler,
}) => {
  return (
    <div className={styles.transferWithEmail}>
      {/* email input */}
      <div className={styles.email}>
        <input
          type="email"
          name="receiverEmail"
          value={transferMoneyState.receiverEmail}
          placeholder={
            t(
              `${PagesNames.QUICK_TRASFER_WIDGET}.${TransferMoneyStrings.EMAIL_FIELD_PLACEHOLDER}`
            ) as string
          }
          onChange={onChangeHandler}
        />
      </div>
      {/* client image */}
      <div className={styles.Img}></div>
    </div>
  );
};

export default ViaEmail;
