import React, { Component } from "react";
import styles from "./Home.module.scss";
import SideBar from "../templates/SideBar/SideBar";
import { Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Cards from "../Cards/Cards";
import Reports from "../Reports/Reports";
import Support from "../Support/Support";
import NavBar from "../templates/NavBar/NavBar";
import { connect } from "react-redux";
import Profile from "../Profile/Profile";

class Home extends Component<any> {
  state = {};
  render() {
    return (
      <section className={styles.Home}>
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
  }
}

export default connect()(Home);
