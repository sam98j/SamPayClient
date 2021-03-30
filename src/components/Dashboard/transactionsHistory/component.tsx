import React from "react"
import { connect } from "react-redux"
import { AppState } from "../../../store/interface"
import SingleTransaction from "../../templates/SingleTransaction/component"
import { compProps } from "./interface"
import styles from "./styles.module.scss"

function TransactionsHistory(props: compProps){
  // transactions History
  const {transHistory} = props;
    return (
        <section className={styles.Transactions}>
          <h4 className={styles.TransactionsDate}>Today 20-Jul-2020</h4>
          {transHistory.map((singleTrans) => {
            return <SingleTransaction transaction={singleTrans}/>
          })}
      </section>
    )
}
// map state to props
const mapState = (state: AppState): compProps => {
  return {
    transHistory: state.Auth.client?.transactionsHistory!.reverse()!
  }
}
export default connect(mapState)(TransactionsHistory)