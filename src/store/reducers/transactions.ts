import { TransferStatus, TransTypes } from "../../types/enums/transactions"
import { Client } from "../../types/interfaces/store";
import { TransState } from "../../types/interfaces/trans_reducer";

const initState = {
    currentTransfer: TransferStatus.TRANS_LOADING,
    submitTransfer: false
} as TransState

const transactionsReducer = (state = initState, action: {type: string, payload: any}): TransState => {
    const {SET_TRANSACTION, SUBMIT_TRANSFER, RECEIVER_NOT_FOUND, SUBMIT_TRANSFER_ERR} = TransTypes;
    switch(action.type){
        // an error when submit the transaction
        case SUBMIT_TRANSFER_ERR: {
            return state
        }
        // an error when get the receiver client
        case RECEIVER_NOT_FOUND: {
            return {
                ...state,
                currentTransfer: TransferStatus.TRANS_ERR,
            }
        }
        // after successfuly geting the client 
        case SET_TRANSACTION: {
            const receiver = action.payload as Client;
            return {
                ...state,
                currentTransfer: receiver
            }
        }
        case SUBMIT_TRANSFER: {
            return {
                ...state,
                currentTransfer: TransferStatus.TRANS_LOADING,
                submitTransfer: true
            }
        }
        default: {
            return state
        }
    }
}
export default transactionsReducer