import { DetailedSingleTrans } from "./types/interfaces/system_api";
import { CurrentTransfer } from "./types/interfaces/trans_reducer";

export interface CompoProps {
  isLogged?: boolean | null;
  currentTransfer?: CurrentTransfer,
  client_id: string,
  detailedSingleTrans: DetailedSingleTrans | null
}