import { Devices, ThemeColor } from './types/enums/system';
import { DetailedSingleTrans } from './types/interfaces/system_api';
import { ReceiveMoneyNotification } from './types/interfaces/trans_apis';
import { CurrentTransfer } from './types/interfaces/trans_reducer';

export interface CompoProps {
  isLogged?: boolean | null;
  currentTransfer?: CurrentTransfer;
  client_id: string;
  detailedSingleTrans: DetailedSingleTrans | null;
  device: Devices;
  themeColor: ThemeColor;
  transferMoneyMobile: boolean;
}
