import React, { Component } from "react";
import styles from "./Home.module.scss";
import SideBar from "../../components/SideBar/SideBar";
import { Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Cards from "../../components/Cards/Cards";
import Reports from "../Reports/Reports";
import Support from "../Support/Support";
import NavBar from "../../components/NavBar/NavBar";
import { connect, useSelector } from "react-redux";
import Profile from "../Profile/Profile";
import { AppState } from "../../types/interfaces/store";
import { HomeProps } from "./interface";
import InComeTransAlert from "../../components/InComeTransAlert/InComeTransAlert";

const Home = () => {
  const { incomingTransAlert } = useSelector<AppState, HomeProps>(
    ({ system }) => ({ incomingTransAlert: system.incomingTransAlert })
  );
  return (
    <section className={styles.Home}>
      {incomingTransAlert ? <InComeTransAlert /> : ""}
      <SideBar />
      <section className={styles.RoutesArea}>
        <NavBar />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={Cards} path="/cards" />
        <Route component={Reports} path="/reports" />
        <Route component={Support} path="/support" />
        <Route component={Profile} path="/profile" />
      </section>
    </section>
  );
};

export default Home;
