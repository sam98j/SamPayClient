import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { InitateClient } from "./apis/auth";
import { CompoProps } from "./root.interface";
import Loading from "./components/Loading/Loading";
import styles from "./App.module.scss";
import { AppState } from "./types/interfaces/store";
import Welcome from "./pages/Welcome/Welcome";
import ConfirmTransfer from "./pages/Dashboard/SubmitTransfer/SubmitTransfer";
import { TransferStatus } from "./types/enums/transactions";
import { connect } from "socket.io-client";
import { receiveMoney } from "./apis/transactions";
import { ReceiveMoneyNotification } from "./types/interfaces/trans_apis";
import { useLocation, useHistory } from "react-router-dom";
import DetailedSingleTransaction from "./components/DetailedSingleTrans/DetailedSingleTrans";
import TransferMoneyPanel from "./components/TransferMoneyPanel/TransferMoneyPanel";
import { checkDeviceScreen } from "./utils/system";
import { setDeviceType } from "./apis/system";
import { Devices, ThemeColor } from "./types/enums/system";
import DetailedTrxMobile from "./components/DetailedTrxMobile/DetailedTrxMobile";
import { log } from "console";

function App() {
  // use dispatch to send action to the store, change the state of the store
  const dispatch = useDispatch();
  // redirect user
  const { push } = useHistory();
  // the current route
  const { pathname } = useLocation();
  // get state from redux store
  const {
    isLogged,
    currentTransfer,
    client_id,
    detailedSingleTrans,
    device,
    themeColor,
    systemLang,
    transferMoneyMobile,
  } = useSelector<AppState, CompoProps>((state) => ({
    isLogged: state.auth.isLogged,
    currentTransfer: state.transactions.currentTransfer,
    client_id: state.auth.client?._id!,
    detailedSingleTrans: state.system.detailedSingleTrans,
    device: state.system.device,
    themeColor: state.system.themeColor,
    transferMoneyMobile: state.system.transferMoneyMobile,
    systemLang: state.system.currentLang,
  }));
  // play notification sound
  const playNotificationSound = () => {
    const tone = new Audio("/sounds/swiftly-610.mp3");
    tone.play();
  };
  // componet did update
  useEffect(() => {
    // set Apss Elements Direction
    (function setAppsElementsDir() {
      systemLang === "ar"
        ? document.getElementsByTagName("html")[0].setAttribute("dir", "rtl")
        : document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
    })();
    // listen for isLoggedIn to redirect the user
    if (isLogged && pathname === "/") {
      push("/dashboard");
    }
    // quit if the client id dosnot ready
    if (!client_id) {
      return;
    }
    // connect the socket
    const api_url = process.env.REACT_APP_API_URL!;
    const socket = connect(`${api_url}`, {
      query: {
        client_id: client_id,
      },
    });
    // listen to the sockets events
    socket.on("notification", (notification: ReceiveMoneyNotification) => {
      // send the updated balance to the redux store
      dispatch(receiveMoney(notification));
      // play notification sound
      playNotificationSound();
    });
  }, [client_id, isLogged, systemLang]);
  // component did mount
  useEffect(() => {
    // set inital system lang
    (function setInitalSystemLang() {
      systemLang === "ar"
        ? document.getElementsByTagName("html")[0].setAttribute("dir", "rtl")
        : console.log("system lang is en");
    })();
    dispatch(setDeviceType(checkDeviceScreen()));
    // apis call to decide if user is logged in or not
    dispatch(InitateClient());
  }, []);
  // listen to theme color change
  useEffect(() => {
    if (themeColor === ThemeColor.LIGHT) {
      const docElement = document.querySelector("meta[name=theme-color]");
      docElement?.setAttribute("content", "#f7f7f7");
      return;
    }
    const docElement = document.querySelector("meta[name=theme-color]");
    docElement?.setAttribute("content", "#3a3b3c");
  }, [themeColor]);
  // decide which component will be rendered
  // null -> loading, false -> Welcome screen, true -> Home page
  const component = isLogged === null ? Loading : isLogged ? Home : Welcome;
  // current transfer faild status
  const { TRANS_ERR, TRANS_LOADING } = TransferStatus;
  // submit transfer modal
  const SubmitTransferModal =
    currentTransfer === TRANS_ERR || currentTransfer === TRANS_LOADING ? (
      ""
    ) : (
      <ConfirmTransfer />
    );
  return (
    <div className={styles.App} data-theme={themeColor}>
      {/* component to show transaction details */}
      {/* show it in mobile version only */}
      {device === Devices.DESKTOP ? (
        detailedSingleTrans ? (
          <DetailedSingleTransaction />
        ) : (
          ""
        )
      ) : detailedSingleTrans ? (
        <DetailedTrxMobile />
      ) : (
        ""
      )}
      {/* submit transfer modal */}
      {device === Devices.DESKTOP ? SubmitTransferModal : ""}
      {/* send money mobile */}
      {/* SendMoney Mobile Pannel */}
      {transferMoneyMobile ? <TransferMoneyPanel /> : ""}
      {/* render Home page or Welcome page */}
      <Switch>
        <Route component={component} path="/" />
      </Switch>
    </div>
  );
}

export default App;
