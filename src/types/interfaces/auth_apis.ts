import { Client } from "./store";
// is requir when client want to loggin
export interface ClientCredentioal {
  email: string;
  password: string;
}
// data come from the serve if token sent is valid
export interface AuthSuccess {
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
  token: string;
  client: Client;
}