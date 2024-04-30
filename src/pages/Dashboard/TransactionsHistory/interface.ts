import { SingleTrans } from '../../../types/interfaces/store';
import { DetailedSingleTrans } from '../../../types/interfaces/system_api';

// the props of component
export interface TransHisProps {
  transHistory: SingleTrans[];
  detailedsingletrans: null | DetailedSingleTrans;
}
