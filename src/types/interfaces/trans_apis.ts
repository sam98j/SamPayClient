import { Client, SingleTrans } from "./store";

// submit Transfer method paramtars
export interface SubmitTransParms {
    receiverPhone: string;
    amount: number
}
export interface SubmitTransferRes {
    newBalance: number,
    newTransaction: SingleTrans
}
// body of post request to get receiver client
export interface GetReceiverBody {
    receiverPhone: string
}
// response of post request to get receiver client
export interface GetReceiverRes {
    receiver: Client
}
// getReceiverMethod Params
export type GetReceiverParms = string
// receive money notification
export interface ReceiveMoneyNotification {
    sender: string;
    transAmount: number,
    updatedBalance?: number
}