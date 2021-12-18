import { GetReceiverBody, 
        GetReceiverParms, 
        ReceiveMoneyNotification, 
        SubmitTransferRes, 
        SubmitTransParms 
    } from "../types/interfaces/trans_apis";
import { TransTypes } from "../types/enums/transactions";
import { Client } from "../types/interfaces/store";
const api_url = process.env.REACT_APP_API_URL!;

// make Transaction
export const getReceiver = (phone: GetReceiverParms) => async (dispatch: Function) => {
    const {RECEIVER_NOT_FOUND, SET_TRANSACTION} = TransTypes;
    // get receiver request body
    const reqBody: GetReceiverBody = {receiverPhone: phone}
    // request config object
    const ReqConfig: RequestInit = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(reqBody)
    }
    // init request
    const response = await fetch(`${api_url}/transfer/get_receiver`, ReqConfig);
    // check if an error found
    if(response.status !== 200) {
        dispatch({type: RECEIVER_NOT_FOUND})
        return
    }
    // Parse the Response
    const receiver = await response.json() as Client;
    dispatch({type: SET_TRANSACTION, payload: receiver})
}
// submit the transaction
export const submitTransfer = (data: SubmitTransParms) => async (dispatch: Function) => {
   const {SUBMIT_TRANSFER_ERR, SUBMIT_TRANSFER} = TransTypes;
  // get the token from the local storage
  const token = localStorage.getItem("token")!;
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
  const response = await fetch(`${api_url}/transfer/submit_transfer`, ReqConfig);
  // check if an error
  if(response.status !== 200) {
      dispatch({type: SUBMIT_TRANSFER_ERR})
      return
  }
  // Parsing response
  const submitTransRes = await response.json() as SubmitTransferRes;
  // if it done
  dispatch({type: SUBMIT_TRANSFER, payload: submitTransRes})
}
// 
export const receiveMoney = (notification: ReceiveMoneyNotification) => (dispatch: Function) => {
  const {RECEIVE_MONEY} = TransTypes;
  dispatch({type: RECEIVE_MONEY, payload: notification})
} 