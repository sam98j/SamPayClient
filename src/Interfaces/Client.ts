export interface Client{
  _id: String;
  name: String;
  avatar: string;
  transactionsHistory : [ ],
  account : {balance: Number}
  phone?: any
}