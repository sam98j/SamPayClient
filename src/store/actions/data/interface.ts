import { Client } from "../../interface";

// body of post request to get receiver client
export interface getReceiverBody {
    receiverPhone: string
}
// response of post request to get receiver client
export interface getReceiverRes {
    error: boolean;
    data: {receiver: Client}
}

export interface submitTransferRes {
    error: boolean;
    data: {newBalance: string | number}
}
// data reducer state
export interface DataReducerState {
    currentRoute: string;
    currentTransfer: currentTransfer,
    submitTransfer: boolean
}
// current Transfer
export interface currentTransfer {
    receiver: Client | null
}
// submit Transfer method paramtars
export interface SubmitTransParms {
    receiverPhone: string;
    amount: number
}