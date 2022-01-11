import {AuthTypes} from '../../types/enums/auth'
import { TransTypes } from '../../types/enums/transactions';
import { LoginSuccess } from "../../types/interfaces/auth_apis";
import { AuthReducerState } from '../../types/interfaces/auth_reducer';
import { Client } from '../../types/interfaces/store';
import { ReceiveMoneyNotification, SubmitTransferRes } from '../../types/interfaces/trans_apis';

const initState = {
  isLogged: null,
  client: null,
  errMsg: null
} as AuthReducerState;

const loginReducer = (state = initState,action: {type: string, payload: any}): AuthReducerState => {
  const {LOGIN_SUCCESS, LOGIN_FAILD, SIGN_OUT, AUTH_FAILD, AUTH_SUCCESS, CLEAR_AUTH_Err_MSG} = AuthTypes;
  const {SUBMIT_TRANSFER, RECEIVE_MONEY} = TransTypes;
  switch (action.type) {
    // initate client procces is succeed
    case LOGIN_SUCCESS: {
      const {token, client} = action.payload as LoginSuccess;
      // store token in the local storage
      localStorage.setItem("token", `Bearer ${token}`)
      return {
        ...state,
        isLogged: true,
        client
      }
    }
    // in case of login faild
    case LOGIN_FAILD: {
      const errMsg = action.payload as string;
      return {
        ...state,
        isLogged: false,
        client: null,
        errMsg
      };
    }
    // client sign out
    case SIGN_OUT: {
      localStorage.setItem("token", "");
      localStorage.removeItem("receiverHis");
      localStorage.removeItem("notifications");
      return {
        ...state,
        isLogged: false,
        client: null,
      };
    }
    // in case of auth faild
    case AUTH_FAILD: {
      return {
        ...state,
        isLogged: false
      }
    }
    // in case of auth success
    case AUTH_SUCCESS: {
      const client = action.payload as Client
      return {
        ...state,
        isLogged: true,
        client: {
          ...client,
          transactionsHistory: client.transactionsHistory.reverse()
        },
      }
    }
    case SUBMIT_TRANSFER: {
      const {newBalance, newTransaction} = action.payload as SubmitTransferRes;
      const transHistory = [newTransaction, ...state.client?.transactionsHistory!]
      return {
        ...state,
        client: {...state.client!, account: {balance: newBalance}, transactionsHistory: transHistory }
      }
    }
    // Receive Money
    case RECEIVE_MONEY: {
      const {updatedBalance} = action.payload as ReceiveMoneyNotification
      return {
        ...state,
        client: {
          ...state.client!,
          account: {
            balance: updatedBalance!
          }
        }
      }
    }
    // clear auth error message
    case CLEAR_AUTH_Err_MSG: {
      return {
        ...state,
        errMsg: null
      }
    }
    default:
      return state;
  }
};
export default loginReducer