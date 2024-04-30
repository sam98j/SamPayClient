export interface ReceiversHistoryEle {
  img: string;
  date?: string;
  name: string;
  phoneNo: number;
  _id: string;
  email: string;
}
// Detailed single trans
export interface DetailedSingleTrans {
  amount: number;
  avatar: string;
  date: string;
  name: string;
  note: string;
  transId: string;
}
// add receiver to history params
export interface AddReceiverToHisParams {
  name: string;
  phoneNo: number;
  _id: string;
}
