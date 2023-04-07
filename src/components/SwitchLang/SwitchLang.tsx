// creat react function component
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { SwitchLangState } from "./interface";
import { changeCurrentLang } from "../../apis/system";

const SwitchLang = () => {
  // t function hook
  const { t, i18n } = useTranslation();
  // component state
  const [state, setState] = useState<SwitchLangState>({
    lang: "en",
  });
  // useRef hook
  const ref = useRef<HTMLElement>(null);
  // dispatch
  const dispatch = useDispatch();
  // handle from change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setState({
      ...state,
      lang: e.target.value,
    });
    // @ts-ignore
    i18n.changeLanguage(e.target.value);
    // change system language
    dispatch(changeCurrentLang(e.target.value));
  };
  return (
    <div className={styles.SwitchLang}>
      <select
        className="form-select"
        aria-label="Default select example"
        // @ts-ignore
        value={i18n.language}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
};

export default SwitchLang;
