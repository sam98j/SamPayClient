import { Client } from "./store";

// auth reducer state
export interface AuthReducerState {
    isLogged: boolean | null;
    client: Client | null;
    errMsg: null | string
} 