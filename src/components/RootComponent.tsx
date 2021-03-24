import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import { connect } from "react-redux";
import { AuthActions } from "../store/actions/auth.actions";
import {
  RootComponentProps,
  RootComponentMapDispatchProps,
  RootComponentMapStateProps,
} from "./root.interface";
import Loading from "./templates/Loading/Loading";
import styles from "./RootComponent.module.scss";
import { AppState } from "../Interfaces/Store";
import Welcome from "./Welcome/Welcome";
import ConfirmTransfer from "./Dashboard/confirmTransfer/confirmTransfer";

function RootComponent(props: RootComponentProps & RootComponentMapStateProps) {
  const { initateClient, isLogged, currentTransfer } = props;
  useEffect(() => {
    initateClient();
  }, []);

  const component = isLogged === null ? Loading : isLogged ? Home : Welcome;
  return (
    <div className={styles.App}>
      {currentTransfer === null ? "" : <ConfirmTransfer currentTransfer={currentTransfer}/>}
      <Switch>
        <Route component={component} path="/" />
      </Switch>
    </div>
  );
}

const mapDispatch = (dispatch: Function): RootComponentMapDispatchProps => {
  return {
    initateClient: () => dispatch(AuthActions.InitateClient()),
  };
};

const mapState = (state: AppState): RootComponentMapStateProps => {
  return {
    isLogged: state.Auth.isLogged,
    currentTransfer: state.Data.currentTransfer
  };
};

export default connect(mapState, mapDispatch)(RootComponent);
