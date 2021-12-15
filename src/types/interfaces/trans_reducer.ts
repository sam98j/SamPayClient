import { TransferStatus } from "../enums/transactions";
import { Client } from "./store";

export interface TransState {
    currentTransfer: CurrentTransfer,
    submitTransfer: boolean
}
// current transfer that will be procced
export type CurrentTransfer = Client | TransferStatus.TRANS_ERR | TransferStatus.TRANS_LOADING