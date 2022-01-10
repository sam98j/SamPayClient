import { SystemActionsTypes } from "../../types/enums/system";
import { TransTypes } from "../../types/enums/transactions";
import { DetailedSingleTrans, ReceiversHistoryEle } from "../../types/interfaces/system_api";
import { SystemReducerState } from "../../types/interfaces/system_reducer";
import { ReceiveMoneyNotification } from "../../types/interfaces/trans_apis";

const receiversHis = localStorage.getItem("receiverHis");
const notificationRecord = localStorage.getItem("notifications");
const initState = {
    currentRoute: "",
    notifications: notificationRecord ? [...JSON.parse(notificationRecord)] : [],
    receiversHistory: receiversHis ? [...JSON.parse(receiversHis)] : [],
    detailedSingleTrans: null,
    incomingTransAlert: null
} as SystemReducerState

const systemReducer = (state = initState, action: {type: string, payload: any}): SystemReducerState => {
    const {
        SET_CURRENT_ROUTE, 
        ADD_RECEIVER_TO_HISTORY, 
        SHOW_DETAILED_SINGLE_TRANS,
        HIDE__DETAILED_SINGLE_TRANS,
        SHOW_NOTIFICATIONS,
        INCOMING_TRANS_ALERT,
        HIDE_INCOMING_TRANS_ALERT
    } = SystemActionsTypes;
    const {RECEIVE_MONEY, } = TransTypes;
    switch (action.type) {
        // set the route name
        case SET_CURRENT_ROUTE: {
            return {
              ...state,
              currentRoute: action.payload,
            };
        }
        // receiver money notification
        case RECEIVE_MONEY: {
            const notification = action.payload as ReceiveMoneyNotification
            return {
                ...state,
                notifications: [notification, ...state.notifications]
            }
        
        }
        // add receiversHistory ele
        case ADD_RECEIVER_TO_HISTORY: {
            const receiversHistory = action.payload as ReceiversHistoryEle[]
            return {
                ...state,
                receiversHistory
            }
        }
        // show detailed single trans
        case SHOW_DETAILED_SINGLE_TRANS: {
            const detailedSingleTrans = action.payload as DetailedSingleTrans;
            return {
                ...state,
                detailedSingleTrans
            }
        }
        // hide detailed single trans
        case HIDE__DETAILED_SINGLE_TRANS: {
            return {
                ...state,
                detailedSingleTrans: null
            }
        };
        // set notifications to seen
        case SHOW_NOTIFICATIONS: {
            const notificationSeened = action.payload as ReceiveMoneyNotification[];
            return {
                ...state,
                notifications: notificationSeened
            }
        };
        // show income trans alert
        case INCOMING_TRANS_ALERT: {
            const notification = action.payload as ReceiveMoneyNotification;
            console.log(notification);
            return {
                ...state,
                incomingTransAlert: notification
            }
        }
        case HIDE_INCOMING_TRANS_ALERT: {
            return {
                ...state,
                incomingTransAlert: null
            }
        }
        // hide submit transfer modal
        default:
        return state;
    }
}
export default systemReducer