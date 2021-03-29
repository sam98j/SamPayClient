import { Client } from "../../interface";
// is requir when client want to loggin
export interface ClientCredentioal {
  name: string;
  password: string;
}
// requier data for new client whant to regster
export interface ClientRegesterationData {
  name: string;
  password: string;
}
// data come from the serve if token sent is valid
export interface AuthSuccess {
  error: false;
  data: {
    currentClient: Client;
  }
}
// data if the token is not valid or loggin is faild
export interface AuthFaild {
  error: true;
  data: String;
}
// data comes from the server if logging is success
export interface LoginSuccess {
  error: false;
  data: {
    token: String;
    currentClient: Client;
  }
}
// auth reducer state
export interface AuthReducerState {
  isLogged: boolean | null;
  client: Client | null;
} 
// is requir when client want to loggin
export interface ClientCredentioal {
  name: string;
  password: string;
}
// requier data for new client whant to regster
export interface ClientRegesterationData {
  name: string;
  password: string;
}
