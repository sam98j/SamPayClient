import { DetailedSingleTrans } from "./types/interfaces/system_api";
import { ReceiveMoneyNotification } from "./types/interfaces/trans_apis";
import { CurrentTransfer } from "./types/interfaces/trans_reducer";

export interface CompoProps {
  isLogged?: boolean | null;
  currentTransfer?: CurrentTransfer,
  client_id: string,
  detailedSingleTrans: DetailedSingleTrans | null,
}