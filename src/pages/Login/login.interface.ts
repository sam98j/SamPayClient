import { ClientCredentioal } from "../../types/interfaces/auth_apis";
// data come to component from outside
export interface LoginProps  {
  isAuthorized: Boolean,
  isLoggedIn: boolean | null,
  errMsg: null | string
}
// local state of component memebers
export interface LoginState {
  clientCredentioal: ClientCredentioal | null;
  isLoading: boolean;
}