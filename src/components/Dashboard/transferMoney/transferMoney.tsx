import React, { useState } from "react";
import { connect } from "react-redux";
import { getReceiver } from "../../../store/actions/data/creators";
import styles from "./styles.module.scss"

function TransferMoney(props: {getBenfier: Function}){
  const [state, setState] = useState({
    receiverPhone: ""
  })

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function Transfer(e: React.FormEvent) {
    e.preventDefault()
    console.log(state)
    props.getBenfier(state)
  }
    return (
        <section className={styles.MakeTransaction}>
        <h4>Quick Transfer</h4>
        <ul>
          <li>Via Account No</li>
          <li>Via Mobile No</li>
        </ul>
        <div className={styles.TransferWithPhone}>
          <div className={styles.Country}>
            <span></span>
            <span>+249</span>
          </div>
          <div className={styles.Phone}><input type="number" name="receiverPhone" value={state.receiverPhone} onChange={inputHandler}/></div>
          <div className={styles.Img}></div>
        </div>
        <button onClick={Transfer}>Transfer</button>
      </section>
    )
}

const mapDispatch = (dispatch: Function) => {
  return {
    getBenfier: (data: any) => dispatch(getReceiver(data))
  }
}


export default connect(null, mapDispatch)(TransferMoney)