import { getReceiverParms } from "../../../store/actions/data/interface";

// state of component
export interface compState {
    receiverPhone: string
}
// props of component
export interface compProps {
    GetReceiver?: (phone: getReceiverParms) => void
}