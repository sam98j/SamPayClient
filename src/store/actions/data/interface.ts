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
    currentTransfer: {receiver: Client} | null,
    submitTransfer: boolean
}