import { SystemActionsTypes } from "../types/enums/system";
import { ReceiversHistoryEle } from "../types/interfaces/system_api";

export const SetCurrentRoute = (routeName: string) => (dispatch: Function) => {
  const {SET_CURRENT_ROUTE} = SystemActionsTypes;
  dispatch({ type: SET_CURRENT_ROUTE, payload: routeName });
};
// add receiver to the history
export const addReceiverToHistory = () => (dispatch: Function) => {
  const { ADD_RECEIVER_TO_HISTORY} = SystemActionsTypes;
  const historyEle = {
    img: "",
    date:  "2021-Dec-16",
    name: "John Doe"
  } as ReceiversHistoryEle
  dispatch({ type: ADD_RECEIVER_TO_HISTORY, payload: historyEle });
};