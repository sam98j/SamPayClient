import { Client } from "../../../types/interfaces/store";

// local state of component
export interface SubmitTransState {
    amount: number,
    isLoading: boolean
}
// component props
export interface SubmitTransProps {
    currentTransfer: Client,
    isTransaferSubmited: boolean
}