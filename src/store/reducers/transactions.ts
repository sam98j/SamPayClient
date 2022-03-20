import { TransferStatus, TransTypes } from "../../types/enums/transactions"
import { Client } from "../../types/interfaces/store";
import { TransState } from "../../types/interfaces/trans_reducer";

const initState = {
    currentTransfer: TransferStatus.TRANS_LOADING,
    submitTransfer: false
} as TransState

const transactionsReducer = (state = initState, action: {type: string, payload: any}): TransState => {
    const {
        SET_TRANSACTION, 
        SUBMIT_TRANSFER, 
        GET_RECEIVER_ERR,
        SERVER_ERR, 
        SUBMIT_TRANSFER_ERR,
        HIDE_SUBMIT_TRANS_MODAL,
        CLEAR_CURRENT_TRANSFER
    } = TransTypes;
    switch(action.type){
        // an error when submit the transaction
        case SUBMIT_TRANSFER_ERR: {
            return state
        }
        // an error when get the receiver client
        case GET_RECEIVER_ERR: {
            return {
                ...state,
                currentTransfer: TransferStatus.TRANS_ERR,
            }
        }
        // in case of server error
        case SERVER_ERR: {
            return {
                ...state,
                currentTransfer: TransferStatus.TRANS_ERR
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
                submitTransfer: true
            }
        }
        // hide modal
        case HIDE_SUBMIT_TRANS_MODAL: {
            return {
                ...state,
                currentTransfer: TransferStatus.TRANS_LOADING
            }
        }
        // Clear Current Transfer to hide submitTransfer Modal
        case CLEAR_CURRENT_TRANSFER: {
            return {
                ...state,
                currentTransfer: TransferStatus.TRANS_LOADING,
                submitTransfer: false
            }
        }
        default: {
            return state
        }
    }
}
export default transactionsReducer