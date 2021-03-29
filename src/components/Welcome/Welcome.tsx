import React from "react";
import styles from "./Welcome.module.scss";
import { Route } from "react-router-dom";
import Login from "../Auth/Login/Login";

const Welcome = () => {
  return (
    <section className={styles.Welcome}>
      <Route exact path="/" component={Login} />
    </section>
  );
};

export default Welcome;
