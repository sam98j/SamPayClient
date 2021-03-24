import { ClientRegesterationData } from "../../../Interfaces/Auth";

export interface State {
    Data: ClientRegesterationData;
  }
  
  export interface MapDispatch {
    SignUpClient: (Data: ClientRegesterationData) => {};
  }
  
  export interface Props extends MapDispatch {
    SignUpClient: (Data: ClientRegesterationData) => {};
  }