import { AuthTypes } from "../../types/enums/auth";
import { Devices, SystemActionsTypes, ThemeColor, TransferMethods } from "../../types/enums/system";
import { TransTypes } from "../../types/enums/transactions";
import { DetailedSingleTrans, ReceiversHistoryEle } from "../../types/interfaces/system_api";
import { SystemReducerState } from "../../types/interfaces/system_reducer";
import { ReceiveMoneyNotification } from "../../types/interfaces/trans_apis";

// receiverHistory
const receiversHis = localStorage.getItem("receiverHis");
// notificatioins
const notificationRecord = localStorage.getItem("notifications");
// theme color
const themeColor = localStorage.getItem("themeColor");
// reducer state
const initState = {
    currentRoute: "",
    notifications: notificationRecord ? [...JSON.parse(notificationRecord)] : [],
    receiversHistory: receiversHis ? [...JSON.parse(receiversHis)] : [],
    detailedSingleTrans: null,
    incomingTransAlert: null,
    transferMethod: TransferMethods.VIA_EMAIL,
    getReceiverErr: null,
    device: Devices.DESKTOP,
    themeColor: themeColor ? themeColor : ThemeColor.LIGHT,
    transferMoneyMobile: false,
    currentLang: "en"
} as SystemReducerState

const systemReducer = (state = initState, action: {type: string, payload: any}): SystemReducerState => {
    const {
        SET_CURRENT_ROUTE, 
        ADD_RECEIVER_TO_HISTORY, 
        SHOW_DETAILED_SINGLE_TRANS,
        HIDE__DETAILED_SINGLE_TRANS,
        SHOW_NOTIFICATIONS,
        INCOMING_TRANS_ALERT,
        HIDE_INCOMING_TRANS_ALERT,
        SET_DEVICE_TYPE,
        SELECT_TRANSFER_METHOD,
        HIDE_GET_RECEIVER_ERR_MSG,
        SET_THEME_COLOR,
        TRANSFER_MONEY_MOBILE,
        SET_CURRENT_LANG
    } = SystemActionsTypes;
    // transactions actions types
    const {RECEIVE_MONEY, SERVER_ERR, GET_RECEIVER_ERR} = TransTypes;
    const {SIGN_OUT} = AuthTypes
    switch (action.type) {
        // set current lang
        case SET_CURRENT_LANG: { 
            const currentLang = action.payload as string;
            return {
                ...state,
                currentLang
            }
        }
        // set device type
        case SET_DEVICE_TYPE: {
            const deviceType = action.payload as Devices;
            return {
                ...state,
                device: deviceType
            }
        }
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
        // when user sign out
        case SIGN_OUT: {
            return {
                ...state,
                notifications: [],
                receiversHistory: []
            }
        }
        // select transfer method
        case SELECT_TRANSFER_METHOD: {
            const transferMethod = action.payload as TransferMethods;
            return {
                ...state,
                transferMethod
            }
        }
        // in case of get receiver error
        case GET_RECEIVER_ERR: {
            const getReceiverErrMsg = action.payload as string;
            return {
                ...state,
                getReceiverErr: getReceiverErrMsg
            }
        }
        // in case of get receiver server error
        case SERVER_ERR: {
            const serverErrMsg = action.payload as string;
            return {
                ...state,
                getReceiverErr: serverErrMsg
            }
        }
        // hide getReceiverErr Message
        case HIDE_GET_RECEIVER_ERR_MSG: {
            return {
                ...state,
                getReceiverErr: null
            }
        }
        // set theme color
        case SET_THEME_COLOR: {
            const themeColor = action.payload as ThemeColor;
            return {
                ...state,
                themeColor
            }
        }
        // transfer moeny in mobile device
        case TRANSFER_MONEY_MOBILE: {
            const status = action.payload as boolean;
            return {
                ...state,
                transferMoneyMobile: status
            }
        }
        // hide submit transfer modal
        default:
        return state;
    }
}
export default systemReducer