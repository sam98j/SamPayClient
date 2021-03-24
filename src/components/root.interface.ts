import { Client } from "../Interfaces/Client";

export interface RootComponentProps {
    initateClient: Function;
    isLogged: boolean | null;
  }
  export interface RootComponentMapDispatchProps {
    initateClient: Function;
  }
  export interface RootComponentMapStateProps {
    isLogged: boolean | null;
    currentTransfer: {receiver: Client} | null
  }