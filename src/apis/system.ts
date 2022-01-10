import { SystemActionsTypes } from "../types/enums/system";
import { DetailedSingleTrans, ReceiversHistoryEle } from "../types/interfaces/system_api";
import moment from "moment";
import { ReceiveMoneyNotification } from "../types/interfaces/trans_apis";
import { addReceiverToLocalStorage } from "../utils/system";

export const SetCurrentRoute = (routeName: string) => (dispatch: Function) => {
  const {SET_CURRENT_ROUTE} = SystemActionsTypes;
  dispatch({ type: SET_CURRENT_ROUTE, payload: routeName });
};
// add receiver to the history
export const addReceiverToHistory = ({name, phoneNo, _id, img}: ReceiversHistoryEle) => (dispatch: Function) => {
  const { ADD_RECEIVER_TO_HISTORY} = SystemActionsTypes;
  // history ele date
  const date = moment().format("YYYY-MMM-DD, h:mm a")
  const historyEle = {
    img,
    date,
    name,
    phoneNo,
    _id
  } as ReceiversHistoryEle;
  // add history ele to local storage
  const updatedReceiversHis = addReceiverToLocalStorage(historyEle);
  dispatch({ type: ADD_RECEIVER_TO_HISTORY, payload: updatedReceiversHis });
};
// show detailed single trans component
export const showDetailedSingleTrans = (data: DetailedSingleTrans) => (dispatch: Function) => {
  const {SHOW_DETAILED_SINGLE_TRANS} = SystemActionsTypes;
  dispatch({type: SHOW_DETAILED_SINGLE_TRANS, payload: data})
}
// hide detailed single trans component
export const hideDetailedSingleTrans = () => (dispatch: Function) => {
  const {HIDE__DETAILED_SINGLE_TRANS} = SystemActionsTypes;
  // dispatch an action to redux store
  dispatch({type: HIDE__DETAILED_SINGLE_TRANS})
}
// set notifications to seened;
export const seeNotifications = () => (dispatch: Function) => {
  const notificationsRecord = localStorage.getItem("notifications");
  // if no notifications
  if(notificationsRecord === null) {
    return
  }
  const parsedNotificationsRecord = JSON.parse(notificationsRecord) as ReceiveMoneyNotification[];
  // set unseen notifications to seen
  const updatedNotificationsRecord = parsedNotificationsRecord.map(notificationEle => {
    // if notification is seened
    if(notificationEle.seen) {
      return notificationEle
    }
    // if notification is unseened
    const notficationSeened = {...notificationEle, seen: true} as ReceiveMoneyNotification;
    return notficationSeened
  });
  localStorage.setItem("notifications", JSON.stringify(updatedNotificationsRecord));
  const {NOTIFICATION_SEENED} = SystemActionsTypes;
  dispatch({type: NOTIFICATION_SEENED, payload: updatedNotificationsRecord})
}
// hide incoming trans alert
export const hideIncomingTransAlert = () => (dispatch: Function) => {
  const {HIDE_INCOMING_TRANS_ALERT} = SystemActionsTypes
  dispatch({type: HIDE_INCOMING_TRANS_ALERT})
}