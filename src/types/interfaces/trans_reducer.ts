import { TransferStatus } from '../enums/transactions';
import { Client } from './store';
import { Receiver } from './trans_apis';

export interface TransState {
  currentTransfer: CurrentTransfer;
  submitTransfer: boolean;
}
// current transfer that will be procced
export type CurrentTransfer = Receiver | TransferStatus.TRANS_ERR | TransferStatus.TRANS_LOADING;
