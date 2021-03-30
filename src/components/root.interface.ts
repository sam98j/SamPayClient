import { currentTransfer } from "../store/actions/data/interface";
import { Client } from "../store/interface";

export interface compoProps {
  initateClient?: Function;
  isLogged?: boolean | null;
  currentTransfer?: currentTransfer
}