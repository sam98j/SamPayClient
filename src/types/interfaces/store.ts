import { AuthReducerState } from "./auth_reducer";
import { TransState } from "./trans_reducer";
import { SystemReducerState } from "./system_reducer";

// the whole app state or the rootReducer
export interface AppState {
    auth: AuthReducerState;
    system: SystemReducerState;
    transactions: TransState;
}
// 
export interface Client{
    _id: string;
    name: string;
    avatar: string;
    transactionsHistory : SingleTrans[],
    account : {balance: Number}
    phone?: any
}
// Single Transaction
export interface SingleTrans {
    amount: string;
    date: string;
    receiver: {name: string; avatar: string},
    note: string
}