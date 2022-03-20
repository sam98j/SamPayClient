import { GetReceiverBody, 
        GetReceiverParms, 
        ReceiveMoneyNotification, 
        SubmitTransferRes, 
        SubmitTransParms 
    } from "../types/interfaces/trans_apis";
import { GetReceiverErr, TransTypes } from "../types/enums/transactions";
import { Client } from "../types/interfaces/store";
import { SystemActionsTypes } from "../types/enums/system";
const api_url = process.env.REACT_APP_API_URL!;

// make Transaction
export const getReceiver = (receiverContact: GetReceiverParms) => async (dispatch: Function) => {
    const {SET_TRANSACTION, GET_RECEIVER_ERR, SERVER_ERR} = TransTypes;
    // get receiver request body
    const reqBody = {receiverContact} as GetReceiverBody;
    // token
    const token = localStorage.getItem("token") as string
    // request config object
    const ReqConfig: RequestInit = {
        method: "POST",
        headers: {
          "Content-type": "application/json", 
          "authorization": token
        },
        body: JSON.stringify(reqBody)
    }
    // init request
    const response = await fetch(`${api_url}/transfer/get_receiver`, ReqConfig);
    // check if an error found
    if(response.status !== 200) {
      // if status = 400
      if(response.status === 400){
        // get receiver errors
        const {CLIENT_DOSNOT_EXIST, YOU_CANT_SEND_TO_YOUR_SELF} = GetReceiverErr;
        const {err} = await response.json() as {err: string}
        // if receiver dosnot exist
        if(err === CLIENT_DOSNOT_EXIST) {
          dispatch({type: GET_RECEIVER_ERR, payload: "Receiver Dosnot Exist"});
          return
        }
        // if receiver dosnot exist
        if(err === YOU_CANT_SEND_TO_YOUR_SELF) {
          dispatch({type: GET_RECEIVER_ERR, payload: "You Can't Send to Your Self"});
          return
        }
      }
      // internal server error
      dispatch({type: SERVER_ERR, payload: "Internal Server Error"})
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
  const {INCOMING_TRANS_ALERT} = SystemActionsTypes
  // add receivers Histroy to localstorage
  const addToLocalStorage = (data: ReceiveMoneyNotification) => {
    // receiver history
    const notificationsRecord = localStorage.getItem("notifications");
    // check if true
    if(notificationsRecord) {
      // update receivers His
      const updatedNotificationsRecord = [data, ...JSON.parse(notificationsRecord) as []];
      localStorage.setItem("notifications", JSON.stringify(updatedNotificationsRecord));
      return
    }
    // if receiver His is empty
    localStorage.setItem("notifications", JSON.stringify([data]))
  }
  // set notification unseen
  const modifiedNotification = {
    ...notification,
    seen: false
  } as ReceiveMoneyNotification;
  // add notification to localhistory
  addToLocalStorage(modifiedNotification);
  dispatch({type: RECEIVE_MONEY, payload: modifiedNotification})
  dispatch({type: INCOMING_TRANS_ALERT, payload: notification})
}
// hide submit transfer modal
export const hideSubmitTransModal = () => (dispatch: Function) => {
  const {HIDE_SUBMIT_TRANS_MODAL} = TransTypes;
  dispatch({type: HIDE_SUBMIT_TRANS_MODAL})
}
// clear current transfer 
export const clearCurrentTransfer = () => (dispatch: Function) => {
  const {CLEAR_CURRENT_TRANSFER} = TransTypes;
  dispatch({type: CLEAR_CURRENT_TRANSFER})
}