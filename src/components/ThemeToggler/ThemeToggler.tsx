import React, { useState } from "react";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { setThemeColor } from "../../apis/system";
import { ThemeColor } from "../../types/enums/system";
import { AppState } from "../../types/interfaces/store";
import styles from "./themetoggler.module.scss";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggler = () => {
  // get default themeColor from the store
  const themeColor = useSelector<AppState, ThemeColor>(
    ({ system }) => system.themeColor
  );
  // themeColor state
  const [color, setColor] = useState<ThemeColor>(themeColor);
  // dispatch store function
  const dispatch = useDispatch();
  // click handler
  const clickHandler = () => {
    // check if color is dark
    if (themeColor === ThemeColor.DARK) {
      setColor(ThemeColor.LIGHT);
      dispatch(setThemeColor(ThemeColor.LIGHT));
    } else {
    }
    // check if color is light
    if (themeColor === ThemeColor.LIGHT) {
      setColor(ThemeColor.DARK);
      dispatch(setThemeColor(ThemeColor.DARK));
    }
  };
  return (
    <div
      className={styles.themetoggler}
      style={{
        justifyContent:
          themeColor === ThemeColor.LIGHT ? "flex-start" : "flex-end",
      }}
    >
      <div className={styles.toggler} onClick={clickHandler}>
        <IconContext.Provider
          value={{ color: themeColor === ThemeColor.LIGHT ? "black" : "white" }}
        >
          {themeColor === ThemeColor.LIGHT ? <FaSun /> : <FaMoon />}
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default ThemeToggler;
