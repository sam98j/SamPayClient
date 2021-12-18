import { ReceiversHistoryEle } from "./system_api";
import { ReceiveMoneyNotification } from "./trans_apis";

// data reducer state
export interface SystemReducerState {
    currentRoute: string;
    notifications: ReceiveMoneyNotification[],
    receiversHistory: ReceiversHistoryEle[]
}