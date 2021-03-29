import { Client } from "../../../Interfaces/Client";
import { getReceiverRes, submitTransferRes } from "./interface";
import {getReceiverBody} from "./interface"
import {set_current_route, submit_transfer, set_current_transfer} from "./types";



export const SetCurrentRoute = (routeName: string) => (dispatch: Function) => {
  dispatch({ type: set_current_route, payload: routeName });
};
  // make Transaction
export const getReceiver = (phone: string) => async (dispatch: Function) => {
    // get receiver request body
    const reqBody: getReceiverBody = {receiverPhone: phone}
    // request config object
    const ReqConfig: RequestInit = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(reqBody)
    }
    // init request
    const reqPending = await fetch("http://localhost:2000/transfer/get_receiver", ReqConfig);
    console.log(reqPending)
    // Parse the Response
    const ResData : getReceiverRes = await reqPending.json();
    // if No error 
  if(!ResData.error) {
      // dispatch the data
      dispatch({type: set_current_transfer, payload: ResData})
  }
}
  // submit the transaction
  export const submitTransfer = (data: {receiverPhone: string, amount: string}) => async (dispatch: Function) => {
    // get the token from the local storage
    const token: string = localStorage.getItem("token")!;
    // req config obj
    const ReqConfig: RequestInit = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token
      },
      body: JSON.stringify(data)
    }
    // init request 
    const reqPending = await fetch("http://localhost:2000/transfer/submit_transfer", ReqConfig);
    // Parsing response
    const ResData: submitTransferRes = await reqPending.json();
    // if it done
    if(!ResData.error) {
      // send the data to the reducer
      dispatch({type: "submit_transfer", payload: ResData})
    }
  }
