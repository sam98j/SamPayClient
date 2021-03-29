import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SetCurrentRoute } from "../../store/actions/data/creators";
import styles from "./Dashboard.module.scss";
import { Client } from "../../Interfaces/Client";
import TransferMoney from "./transferMoney/transferMoney";
import TransactionsHistory from "./transactionsHistory/transHistory";
import { AppState } from "../../Interfaces/Store";

const Dashboard = (props: any) => {
  const {client} = props as {client: Client, setCurrentRoute: Function};
  // when component mount
  useEffect(() => {
    const { setCurrentRoute } = props;
    setCurrentRoute("DashBoard");
  }, []);
  // return the ui
  return (
    <div className={styles.DashBoard}>
      <section className={styles.MainCard}>
        <h6>Your Balance</h6>
        <p className={styles.Balance}>{`\$${client!.account.balance}`}</p>
        <p className={styles.Account}>{`Saving A/C ${client!._id}`}</p>
      </section>
      <TransferMoney />
      <TransactionsHistory/>
      <section className={styles.Cards}></section>
    </div>
  );
};

const mapDispatch = (dispatch: Function) => {
  return {
    setCurrentRoute: (routeName: string) =>
      dispatch(SetCurrentRoute(routeName)),
  };
};

const mapState = (state: AppState) => {
  return {
    client: state.Auth.client
  }
}

export default connect(mapState, mapDispatch)(Dashboard);
