import React from "react";
import styles from "./Welcome.module.scss";
import { Route } from "react-router-dom";
import Login from "../Auth/Login/Login";
import SignUp from "../Auth/SignUp/SignUp";

const Welcome = () => {
  return (
    <section className={styles.Welcome}>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
    </section>
  );
};

export default Welcome;
