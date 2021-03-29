import React, { useState } from "react";
import styles from "./styles.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faPhone, faUniversity } from "@fortawesome/free-solid-svg-icons";
import { Client } from "../../../store/interface";
import { connect } from "react-redux";
import { submitTransfer } from "../../../store/actions/data/creators";

interface Props{
    currentTransfer: {receiver: Client}
}

function ConfirmTransfer(props: Props){
    const {currentTransfer, submitTransfer} = props as {currentTransfer: any, submitTransfer: Function};
    // the component state 
    const [state, setState] = useState({amount: 0})
    // handle inpunt change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    // handle submition
    const handleSubmition = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(state)
        submitTransfer({receiverPhone: currentTransfer.receiver.phone, amount: state.amount})
    }
    return(
        <section className={styles.ConfirmTransfer}>
            <div className={styles.Container}>
                <div className={styles.Header}>
                    <div className={styles.IMG}></div>
                    <h3 className={styles.Name}>
                        <span className={styles.firstName}>{currentTransfer.receiver.name}</span>
                        <span className={styles.lastName}>Mustafa</span>
                    </h3>
                </div>
                <div className={styles.Details}>
                    <div className={styles.DetailsContainer}>
                        <span><FontAwesomeIcon icon={faUniversity} /></span>
                        <h4>Omdurman Branch</h4>
                    </div>
                    <div className={styles.DetailsContainer}>
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <h4>{currentTransfer.receiver.phone}</h4>
                    </div>
                </div>
                <div className={styles.Submit}>
                    <input type="number" value={state.amount} name="amount" onChange={handleChange}/>
                    <button type="submit" onClick={handleSubmition}>Submit</button>
                </div>
            </div>
        </section>
    )
}

const mapDispatch = (dispatch: Function) => {
    return {
        submitTransfer: (data: {receiverPhone: string, amount: string}) => dispatch(submitTransfer(data))
    }
}

export default connect(null, mapDispatch)(ConfirmTransfer)