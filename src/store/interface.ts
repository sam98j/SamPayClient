import { AuthReducerState } from "./actions/auth/interfaces";
import { DataReducerState } from "./actions/data/interface";

// the whole app state or the rootReducer
export interface AppState {
    Auth: AuthReducerState;
    Data: DataReducerState;
}
// 
export interface Client{
    _id: String;
    name: String;
    avatar: string;
    transactionsHistory : [ ],
    account : {balance: Number}
    phone?: any
}