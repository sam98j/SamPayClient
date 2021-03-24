import React from "react"
import SingleTransaction from "../../templates/SingleTransaction/SingleTransaction"
import styles from "./styles.module.scss"

function TransactionsHistory(){
    return (
        <section className={styles.Transactions}>
        <h4 className={styles.TransactionsDate}>Today 20-Jul-2020</h4>
        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
        <h4 className={styles.TransactionsDate}>Today 30-Jan-2020</h4>
        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
        <h4 className={styles.TransactionsDate}>Today 02-Dec-2020</h4>
        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
      </section>
    )
}

export default TransactionsHistory