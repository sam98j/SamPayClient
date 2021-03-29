import { ClientCredentioal } from "../../../store/actions/auth/interfaces";
// data come to component from outside
export interface LoginComponentProps  {
  isAuthorized: Boolean;
  LogginClient: Function;
  LoginClient: Function;
}
// local state of component memebers
export interface LoginComponentState {
  clientCredentioal: ClientCredentioal;
  isLoading: boolean;
}