import { ClientCredentioal } from "../../types/interfaces/auth_apis";
// data come to component from outside
export interface LoginProps  {
  isAuthorized: Boolean
}
// local state of component memebers
export interface LoginState {
  clientCredentioal: ClientCredentioal | null;
  isLoading: boolean;
}