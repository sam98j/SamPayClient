import { Client } from '../../../types/interfaces/store';
import { Receiver } from '../../../types/interfaces/trans_apis';

// local state of component
export interface SubmitTransState {
  amount: number;
  isLoading: boolean;
}
// component props
export interface SubmitTransProps {
  currentTransfer: Receiver;
  isTransaferSubmited: boolean;
}
