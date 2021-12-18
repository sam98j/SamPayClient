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
import ConfirmTransfer from "./pages/Dashboard/SubmitTransfer/component";
import { TransferStatus } from "./types/enums/transactions";
import { connect } from "socket.io-client";
import { receiveMoney } from "./apis/transactions";
import { ReceiveMoneyNotification } from "./types/interfaces/trans_apis";

function App() {
  // use dispatch to send action to the store, change the state of the store
  const dispatch = useDispatch();
  // get state from redux store
  const { isLogged, currentTransfer, client_id } = useSelector<
    AppState,
    CompoProps
  >((state) => ({
    isLogged: state.auth.isLogged,
    currentTransfer: state.transactions.currentTransfer,
    client_id: state.auth.client?._id!,
  }));
  // play notification sound
  const playNotificationSound = () => {
    const tone = new Audio("/sounds/swiftly-610.mp3");
    tone.play();
  };
  // componet did update
  useEffect(() => {
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
  }, [client_id]);
  // component did mount
  useEffect(() => {
    // apis call to decide if user is logged in or not
    dispatch(InitateClient());
  }, []);
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
    <div className={styles.App}>
      {/* submit transfer modal */}
      {SubmitTransferModal}
      {/* render Home page or Welcome page */}
      <Switch>
        <Route component={component} path="/" />
      </Switch>
    </div>
  );
}

export default App;
