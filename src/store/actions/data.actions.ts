import { Client } from "../../Interfaces/Client";
import { getReceiverSuccess, submitTransferSuccess } from "../../Interfaces/Data";
import {set_current_route} from "./types";



export class DataActions {
  static SetCurrentRoute = (routeName: string) => (dispatch: Function) => {
    dispatch({ type: set_current_route, payload: routeName });
  };
  // make Transaction
  static getBenfier = (data: {receiverPhone: Number}) => async (dispatch: Function) => {
    // request config object
    const ReqConfig: RequestInit = {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    }
    // init request
    const reqPending = await fetch("https://bank0.herokuapp.com/transfer/get_receiver", ReqConfig);
    // Parse the Response
    const ResData: getReceiverSuccess = await reqPending.json();
    // if No error 
    if(!ResData.error) {
        // dispatch the data
        dispatch({type: "set_current_transfer", payload: ResData})
    }
  }
  // submit the transaction
  static submitTransfer = (data: {receiverPhone: string, amount: string}) => async (dispatch: Function) => {
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
    const reqPending = await fetch("https://bank0.herokuapp.com/transfer/submit_transfer", ReqConfig);
    // Parsing response
    const ResData: submitTransferSuccess = await reqPending.json();
    // if it done
    if(!ResData.error) {
      // send the data to the reducer
      dispatch({type: "submit_transfer", payload: ResData})
    }
  }
}
