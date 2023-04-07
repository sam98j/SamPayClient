import { Devices, ThemeColor, TransferMethods } from "../enums/system";
import { DetailedSingleTrans, ReceiversHistoryEle } from "./system_api";
import { ReceiveMoneyNotification } from "./trans_apis";

// data reducer state
export interface SystemReducerState {
    currentRoute: string;
    notifications: ReceiveMoneyNotification[];
    receiversHistory: ReceiversHistoryEle[];
    detailedSingleTrans: null | DetailedSingleTrans,
    incomingTransAlert: ReceiveMoneyNotification | null,
    device: Devices,
    transferMethod: TransferMethods,
    getReceiverErr: string | null,
    themeColor: ThemeColor,
    transferMoneyMobile: boolean,
    currentLang: string,
}