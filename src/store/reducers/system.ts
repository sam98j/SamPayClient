import { SystemActionsTypes } from "../../types/enums/system";
import { TransTypes } from "../../types/enums/transactions";
import { ReceiversHistoryEle } from "../../types/interfaces/system_api";
import { SystemReducerState } from "../../types/interfaces/system_reducer";
import { ReceiveMoneyNotification } from "../../types/interfaces/trans_apis";

const initState = {
    currentRoute: "",
    notifications: [],
    receiversHistory: []
} as SystemReducerState

const systemReducer = (state = initState, action: {type: string, payload: any}): SystemReducerState => {
    const {SET_CURRENT_ROUTE, ADD_RECEIVER_TO_HISTORY} = SystemActionsTypes;
    const {RECEIVE_MONEY} = TransTypes;
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
            const {sender, transAmount} = action.payload as ReceiveMoneyNotification
            return {
                ...state,
                notifications: [{sender, transAmount, ...state.notifications}]
            }
        
        }
        // add receiversHistory ele
        case ADD_RECEIVER_TO_HISTORY: {
            const receiverEle = action.payload as ReceiversHistoryEle
            return {
                ...state,
                receiversHistory: [receiverEle, ...state.receiversHistory]
            }
        }
        default:
        return state;
    }
}
export default systemReducer