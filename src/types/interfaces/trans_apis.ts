import { Client, SingleTrans } from './store';

// submit Transfer method paramtars
export interface SubmitTransParms {
  receiverContact: string;
  amount: number;
}
export interface SubmitTransferRes {
  newBalance: number;
  newTransaction: SingleTrans;
}
// body of post request to get receiver client
export interface GetReceiverBody {
  receiverContact: string;
}
// response of post request to get receiver client
export interface Receiver {
  name: string;
  _id: string;
  avatar: string;
  phone: string;
  contact: string;
}
// getReceiverMethod Params
export type GetReceiverParms = string;
// receive money notification
export interface ReceiveMoneyNotification {
  sender: string;
  transAmount: number;
  updatedBalance?: number;
  seen: boolean;
}
