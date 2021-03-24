import { Client } from "./Client";

// the whole app state or the rootReducer
export interface AppState {
  Auth: AuthReducerState;
  Data: DataReducerState;
}
// data reducer state
export interface DataReducerState {
  currentRoute: string;
  currentTransfer: {receiver: Client} | null,
  submitTransfer: boolean
}
// auth reducer state
export interface AuthReducerState {
  isLogged: boolean | null;
  client: Client | null;
}
