import { currentTransfer, SubmitTransParms } from "../../../store/actions/data/interface";

// local state of component
export interface compState {
    amount: number
}
// component props
export interface compProps {
    SubmitTransfer: (data: SubmitTransParms) => Function;
    currentTransfer?: currentTransfer
}