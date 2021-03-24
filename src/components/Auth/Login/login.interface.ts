import { ClientCredentioal } from "../../../Interfaces/Auth";

export interface LoginComponentProps  {
    isAuthorized: Boolean;
    LogginClient: Function;
    LoginClient: Function;
  }
  
  export interface LoginComponentState {
    clientCredentioal: ClientCredentioal;
    isLoading: boolean;
  }