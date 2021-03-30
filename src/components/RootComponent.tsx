import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import { connect } from "react-redux";
import { InitateClient } from "../store/actions/auth/creators";
import { compoProps } from "./root.interface";
import Loading from "./templates/Loading/Loading";
import styles from "./RootComponent.module.scss";
import { AppState } from "../store/interface";
import Welcome from "./Welcome/Welcome";
import ConfirmTransfer from "./Dashboard/SubmitTransfer/component";

function RootComponent(props: compoProps) {
  const { initateClient, isLogged, currentTransfer } = props;
  useEffect(() => {
    initateClient!();
  }, []);

  const component = isLogged === null ? Loading : isLogged ? Home : Welcome;
  return (
    <div className={styles.App}>
      {currentTransfer === null ? "" : <ConfirmTransfer  currentTransfer={currentTransfer}/>}
      <Switch>
        <Route component={component} path="/" />
      </Switch>
    </div>
  );
}

const mapDispatch = (dispatch: Function): compoProps => {
  return {
    initateClient: () => dispatch(InitateClient()),
  };
};

const mapState = (state: AppState): compoProps => {
  return {
    isLogged: state.Auth.isLogged,
    currentTransfer: state.Data.currentTransfer
  };
};

export default connect(mapState, mapDispatch)(RootComponent);
